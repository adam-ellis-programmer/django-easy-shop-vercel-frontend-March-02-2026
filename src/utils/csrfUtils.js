import { API_URL } from '../config'

/**
 * Fetches CSRF token from Django response body
 * Cannot use document.cookie in production because:
 * - Cookies are scoped to railway.app
 * - JavaScript on vercel.app cannot read cross-domain cookies
 * - So we ask Django to return the token in the response body instead
 */
export async function fetchCsrfToken() {
  const response = await fetch(`${API_URL}/get-csrf-token/`, {
    credentials: 'include', // <-- it tells the browser to send all cookies scoped to railway.app with the request:
  })

  const data = await response.json()
  // console.log('DATA FROM CSRF REQ', data)

  return data.csrfToken
}

// =========================
// OLD HELPER FUNCION
// =========================
const getCsrfToken = () => {
  return (
    document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('csrftoken='))
      ?.split('=')[1] || ''
  )
}
