import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => ({
  base: {
    production: 'https://k5-leitertraining.github.io/k5-ghl-utils/',
    development: 'http://localhost:5173/',
  }[mode],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}))
