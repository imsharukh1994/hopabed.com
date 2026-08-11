import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api-sandbox': {
        target: 'https://api.sandbox.co.in',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-sandbox/, '')
      }
    }
  }
})
