import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/

export default defineConfig({
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
})
