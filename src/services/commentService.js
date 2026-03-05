import axios from 'axios'
import { API_URL } from '../config'
import { fetchCsrfToken } from '../utils/csrfUtils' // ← import shared helper

const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const commentsService = {
  // GET - no CSRF needed
  getComments: async (productId) => {
    try {
      const response = await authAxios.get(`/products/${productId}/comments/`)
      return response.data
    } catch (error) {
      console.error('Error getting comments:', error)
      throw error.response ? error.response.data : error
    }
  },

  // POST - needs CSRF
  addComment: async (productId, text, rating) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.post(
        `/products/${productId}/comments/add/`,
        { text, rating },
        { headers: { 'X-CSRFToken': csrfToken } },
      )
      return response.data
    } catch (error) {
      console.error('Error adding comment from service', error)
      throw error.response ? error.response.data : error
    }
  },

  // PUT - needs CSRF
  updateComment: async (commentId, text, rating) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.put(
        `/comments/${commentId}/update/`,
        { text, rating },
        { headers: { 'X-CSRFToken': csrfToken } },
      )
      return response.data
    } catch (error) {
      console.error('Error updating comment:', error)
      throw error.response ? error.response.data : error
    }
  },

  // DELETE - needs CSRF
  deleteComment: async (commentId) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.delete(
        `/comments/${commentId}/delete/`,
        { headers: { 'X-CSRFToken': csrfToken } },
      )
      return response.data
    } catch (error) {
      console.error('Error deleting comment:', error)
      throw error.response ? error.response.data : error
    }
  },

  // GET - no CSRF needed
  getUserComments: async () => {
    try {
      const response = await authAxios.get('/user/comments/')
      return response.data
    } catch (error) {
      console.error('Error getting user comments:', error)
      throw error.response ? error.response.data : error
    }
  },
}

export default commentsService
