import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/expense': {
        target: 'http://localhost:7000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/expense/, '/expense'),
      },
    },
  },
})
