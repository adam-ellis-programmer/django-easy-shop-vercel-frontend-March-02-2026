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

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        // target:
        //   'http://django-api-prod.eba-2ff8w2hp.eu-north-1.elasticbeanstalk.com/',
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        https: false,
      },
    },
  },
})
