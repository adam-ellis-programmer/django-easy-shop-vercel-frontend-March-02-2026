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

// was port 8000 in dev but switched to railway

/**
     Vite proxy — it changes everything:
    Browser thinks:
    localhost:5173 → /api/...  (same domain request)
                    ↓
    Vite proxy secretly forwards to Railway behind the scenes
                    ↓
    Railway responds with Set-Cookie: csrftoken=...
                    ↓
    Vite proxy strips the railway.app domain from the cookie
    and reissues it as a localhost cookie
 */

// he Vite proxy is essentially rewriting the cookies to be
// localhost cookies as part of the proxying process.
// The browser never knows the response came from railway.app — it thinks it came from localhost:5173.

/**
 * that is why we see
 * localhost
 * localhost
 * localhost
 * in cookie jar
 *
 * and not
 * django-easy-shop-server-railway-march-02-2026-production.up.railway.app
 * django-easy-shop-server-railway-march-02-2026-production.up.railway.app
 * django-easy-shop-server-railway-march-02-2026-production.up.railway.app
 * django-easy-shop-server-railway-march-02-2026-production.up.railway.app
 */
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
