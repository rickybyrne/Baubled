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
it('starts the compiled function in Node and keeps live routing closed', async () => {
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
    const { stdout } = await promisify(execFile)(process.execPath, ['--input-type=module', '--eval', `
      import assert from 'node:assert/strict';
      let calls = 0;
      globalThis.fetch = async () => { calls++; throw new Error('Unexpected network request'); };
      const { default: entry } = await import('./api/walking-route.js');
      const origin = 'https://baubled.vercel.app';
      const response = await entry.fetch(new Request(origin + '/api/walking-route', {
        method: 'POST', headers: { origin, 'content-type': 'application/json' },
        body: JSON.stringify({ pubIds: ['p001', 'p002'] }),
      }));
      assert.equal(response.status, 503);
      assert.equal(response.headers.get('cache-control'), 'no-store');
      assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
      assert.ok(response.headers.get('content-type').startsWith('application/json'));
      const body = await response.text();
      assert.equal(JSON.parse(body).error.code, 'ROUTING_UNAVAILABLE');
      assert.ok(!body.includes(process.env.ORS_API_KEY));
      const head = await entry.fetch(new Request(origin + '/api/walking-route', { method: 'HEAD' }));
      assert.equal(head.status, 405);
      assert.equal(head.headers.get('allow'), 'POST');
      assert.equal(await head.text(), '');
      assert.equal(calls, 0);
      console.log('Native Node startup: 503 disabled, 405 HEAD, zero upstream calls');
    `], {
      cwd: output, timeout: 5000,
      // Never forward developer credentials or Node loader overrides to this process.
      env: { NODE_ENV: 'test', VERCEL_ENV: 'production', ROUTING_ENABLED: 'true', ORS_API_KEY: 'NON_SECRET_STARTUP_SENTINEL' },
    })
    expect(stdout.trim()).toBe('Native Node startup: 503 disabled, 405 HEAD, zero upstream calls')
  } finally { await rm(output, { recursive: true, force: true }) }
}, 15_000)
