import axios from 'axios'
import { API_URL } from '../config'
import { fetchCsrfToken } from '../utils/csrfUtils' // ← import shared helper

const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const cartService = {
  // GET - no CSRF needed
  getCart: async () => {
    try {
      const response = await authAxios.get('/cart/')
      return response.data
    } catch (error) {
      console.error('Error getting cart:', error)
      throw error.response ? error.response.data : error
    }
  },

  // POST - needs CSRF
  addToCart: async (productId, quantity = 1) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.post(
        '/cart/add/',
        { product_id: productId, quantity },
        { headers: { 'X-CSRFToken': csrfToken } },
      )
      return response.data
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw error.response ? error.response.data : error
    }
  },

  // PUT - needs CSRF
  updateCartItem: async (itemId, quantity) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.put(
        `/cart/update/${itemId}/`,
        { quantity },
        { headers: { 'X-CSRFToken': csrfToken } },
      )
      return response.data
    } catch (error) {
      console.error('Error updating cart item:', error)
      throw error.response ? error.response.data : error
    }
  },

  // DELETE - needs CSRF
  removeFromCart: async (itemId) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.delete(`/cart/remove/${itemId}/`, {
        headers: { 'X-CSRFToken': csrfToken },
      })
      return response.data
    } catch (error) {
      console.error('Error removing from cart:', error)
      throw error.response ? error.response.data : error
    }
  },

  // DELETE - needs CSRF
  clearCart: async () => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.delete('/cart/clear/', {
        headers: { 'X-CSRFToken': csrfToken },
      })
      return response.data
    } catch (error) {
      console.error('Error clearing cart:', error)
      throw error.response ? error.response.data : error
    }
  },
}

export default cartService
