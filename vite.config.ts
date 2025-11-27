import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        bypass: (req) => {
          if (
            req.headers.accept?.includes('text/html') ||
            req.url?.startsWith('/dashboard') ||
            req.url?.startsWith('/src') ||
            req.url?.startsWith('/node_modules') ||
            req.url?.startsWith('/@') ||
            req.url?.match(/\.(js|ts|tsx|jsx|css|svg|png|jpg|json|ico)$/)
          ) {
            return req.url;
          }
        },
      },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      // Ajoutez d'autres préfixes API au besoin
    },
  },
})
