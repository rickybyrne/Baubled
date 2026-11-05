import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { localApi } from './server/local-api.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), { name: 'disabled-local-routing',
    configureServer(server) { server.middlewares.use(localApi) },
    configurePreviewServer(server) { server.middlewares.use(localApi) },
  }],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    clearMocks: true,
  },
})
