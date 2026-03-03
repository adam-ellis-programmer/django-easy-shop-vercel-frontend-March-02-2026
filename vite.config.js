import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Minimal version - Vite handles optimizations automatically
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://api.easy-shop.biz',
//         changeOrigin: true,
//         secure: true,
//         headers: {
//           Origin: 'https://easy-shop.biz',
//         },
//       },
//     },
//   },
//   // Vite will automatically:
//   // - Use 'dist' as output directory
//   // - Optimize chunks intelligently
//   // - Handle source maps based on environment
// })

// old target
//   'http://django-api-prod.eba-2ff8w2hp.eu-north-1.elasticbeanstalk.com/',

// const isInDev = import.meta.env.VITE_NODE_ENV

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target:
          'https://django-easy-shop-server-railway-march-02-2026-production.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})

// secure: true/false
// Controls whether the proxy verifies the SSL certificate of the target server.

// secure: true   // verify the SSL cert (default) - use for real HTTPS servers
// secure: false  // skip SSL verification - use for self-signed certs or local HTTP
