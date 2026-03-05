import axios from 'axios'
import { API_URL } from '../config'
import { fetchCsrfToken } from '../utils/csrfUtils' // ← import shared helper

const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const bookmarkService = {
  // GET - no CSRF needed
  getUserBookmarks: async () => {
    try {
      const response = await authAxios.get('/bookmarks/')
      return response.data
    } catch (error) {
      console.error('Error getting bookmarks:', error)
      throw error.response ? error.response.data : error
    }
  },

  // POST - needs CSRF
  toggleBookmark: async (productId) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.post(
        '/bookmarks/toggle/',
        { product_id: productId },
        { headers: { 'X-CSRFToken': csrfToken } },
      )
      return response.data
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      throw error.response ? error.response.data : error
    }
  },

  // DELETE - needs CSRF
  removeBookmark: async (bookmarkId) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.delete(`/bookmarks/${bookmarkId}/`, {
        headers: { 'X-CSRFToken': csrfToken },
      })
      return response.data
    } catch (error) {
      console.error('Error removing bookmark:', error)
      throw error.response ? error.response.data : error
    }
  },
}

export default bookmarkService
