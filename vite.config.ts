import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createLocalApi } from './server/local-api.ts'
import { readLocalProof } from './server/local-proof.ts'

export default defineConfig(({ command, mode, isPreview }) => {
  const proof = command === 'serve' && !isPreview && mode === 'live-proof' ? readLocalProof(process.cwd()) : undefined
  return {
    // Only the browser-intended MapTiler key is exposed in the explicit local mode.
    // The secret file is outside Vite's env naming scheme and is denied as an asset.
    define: proof ? { 'import.meta.env.VITE_MAPTILER_KEY': JSON.stringify(proof.mapKey) } : {},
    server: { host: '127.0.0.1', ...(proof ? { port: 5174, strictPort: true, hmr: false, watch: null, forwardConsole: false } : {}),
      // Preserve all installed Vite 8.3.4 defaults, then add our credential directory.
      // This must be configured before Vite compiles its file-denial matcher.
      fs: { deny: ['.env', '.env.*', '*.{crt,pem,key,p12,pfx,cer,der}', '.npmrc', '.yarnrc.yml', '**/.git/**', '**/secrets/**'] } },
    plugins: [react(), tailwindcss(), { name: 'local-routing',
      configureServer(server) { server.middlewares.use(createLocalApi(proof)) },
      configurePreviewServer(server) { server.middlewares.use(createLocalApi()) },
    }],
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      clearMocks: true,
    },
  }
})
