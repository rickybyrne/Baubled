// @vitest-environment node
import { execFile } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { promisify } from 'node:util'
import ts from 'typescript'
import { expect, it } from 'vitest'

// Vitest/Vite can resolve imports which native Node ESM cannot. Exercise the
// emitted function dependency graph in a separate Node process, without Vite.
it('starts the compiled function in Node and enforces production activation without real requests', async () => {
  const output = await mkdtemp(resolve(tmpdir(), 'baubled-function-startup-'))
  try {
    const config = ts.readConfigFile(resolve('tsconfig.json'), ts.sys.readFile)
    expect(config.error).toBeUndefined()
    const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, process.cwd())
    expect(parsed.errors).toEqual([])
    const program = ts.createProgram([resolve('api/walking-route.ts')], {
      ...parsed.options, rootDir: process.cwd(), outDir: output,
      noEmit: false, noEmitOnError: true, allowImportingTsExtensions: false,
      module: ts.ModuleKind.NodeNext, moduleResolution: ts.ModuleResolutionKind.NodeNext,
    })
    const emit = program.emit()
    const diagnostics = [...ts.getPreEmitDiagnostics(program), ...emit.diagnostics]
    expect(ts.formatDiagnostics(diagnostics, {
      getCanonicalFileName: name => name, getCurrentDirectory: () => process.cwd(), getNewLine: () => '\n',
    })).toBe('')
    expect(emit.emitSkipped).toBe(false)
    await writeFile(resolve(output, 'package.json'), '{"type":"module"}')
    for (const [environment, enabled, credential, callsExpected] of [
      ['production', 'false', 'NON_SECRET_STARTUP_SENTINEL', 0],
      ['production', '', 'NON_SECRET_STARTUP_SENTINEL', 0],
      ['preview', 'true', 'NON_SECRET_STARTUP_SENTINEL', 0],
      ['development', 'true', 'NON_SECRET_STARTUP_SENTINEL', 0],
      ['', 'true', 'NON_SECRET_STARTUP_SENTINEL', 0],
      ['production', 'true', '', 0],
      ['production', 'true', 'NON_SECRET_STARTUP_SENTINEL', 1],
    ] as const) {
      const { stdout } = await promisify(execFile)(process.execPath, ['--input-type=module', '--eval', `
        import assert from 'node:assert/strict';
        let calls = 0;
        let observed;
        globalThis.fetch = async (url, init) => {
          calls++;
          observed = { url, init };
          return Response.json({error:{message:process.env.ORS_API_KEY}}, {status:500});
        };
        const { default: entry } = await import('./api/walking-route.js');
        const origin = 'https://baubled.vercel.app';
        const response = await entry.fetch(new Request(origin + '/api/walking-route', {
          method: 'POST', headers: { origin, 'content-type': 'application/json' },
          body: JSON.stringify({ pubIds: ['p001', 'p002'] }),
        }));
        assert.equal(response.status, ${callsExpected ? 502 : 503});
        assert.equal(response.headers.get('cache-control'), 'no-store');
        assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
        assert.ok(response.headers.get('content-type').startsWith('application/json'));
        const body = await response.text();
        assert.equal(JSON.parse(body).error.code, '${callsExpected ? 'ROUTING_SERVICE_ERROR' : 'ROUTING_UNAVAILABLE'}');
        if (process.env.ORS_API_KEY) assert.ok(!body.includes(process.env.ORS_API_KEY));
        const head = await entry.fetch(new Request(origin + '/api/walking-route', { method: 'HEAD' }));
        assert.equal(head.status, 405);
        assert.equal(head.headers.get('allow'), 'POST');
        assert.equal(await head.text(), '');
        assert.equal(calls, ${callsExpected});
        if (${callsExpected}) {
          // Assert outside the mock: the handler deliberately catches fetch errors.
          const { PUBS } = await import('./shared/catalogue.js');
          assert.equal(observed.url, 'https://api.heigit.org/openrouteservice/v2/directions/foot-walking/geojson');
          assert.equal(observed.init.headers.Authorization, process.env.ORS_API_KEY);
          assert.equal(observed.init.redirect, 'error');
          assert.deepEqual(JSON.parse(observed.init.body), {
            coordinates: PUBS.slice(0, 2).map(pub => pub.position),
            instructions: true, instructions_format: 'text', language: 'en', units: 'm',
          });
        }
        console.log('Native Node startup: activation boundary passed');
      `], {
        cwd: output, timeout: 5000,
        // Never forward developer credentials or Node loader overrides to this process.
        env: { NODE_ENV: 'test', VERCEL_ENV: environment, ROUTING_ENABLED: enabled, ORS_API_KEY: credential },
      })
      expect(stdout.trim()).toBe('Native Node startup: activation boundary passed')
    }
  } finally { await rm(output, { recursive: true, force: true }) }
}, 15_000)
