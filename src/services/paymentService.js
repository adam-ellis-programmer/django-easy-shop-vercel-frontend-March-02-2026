import axios from 'axios'
import { API_URL } from '../config'
import { fetchCsrfToken } from '../utils/csrfUtils'  // ← import shared helper

const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const paymentService = {
  // GET - no CSRF needed
  calculatePayment: async () => {
    try {
      const response = await authAxios.get('/payment/calculate/')
      return response.data
    } catch (error) {
      console.error('Error calculating payment:', error)
      throw error.response ? error.response.data : error
    }
  },

  // POST - needs CSRF
  createCheckoutSession: async () => {
    try {
      const csrfToken = await fetchCsrfToken()  // ← get token from response body

      const response = await authAxios.post(
        '/payment/create-checkout-session/',
        {},
        { headers: { 'X-CSRFToken': csrfToken } }
      )

      return {
        success: true,
        clientSecret: response.data.clientSecret,
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to create checkout session',
      }
    }
  },

  // GET - no CSRF needed
  checkSessionStatus: async (sessionId) => {
    try {
      const response = await authAxios.get(
        `/payment/session-status/?session_id=${sessionId}`
      )
      return {
        success: true,
        status: response.data,
      }
    } catch (error) {
      console.error('Error checking session status:', error)
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to check session status',
      }
    }
  },
}

export default paymentService