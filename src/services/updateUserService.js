import axios from 'axios'
import { API_URL } from '../config'
import { fetchCsrfToken } from '../utils/csrfUtils' // ← import shared helper

const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const updateUserService = {
  // GET - no CSRF needed
  getUser: async (userId) => {
    try {
      const response = await authAxios.get(`/get-user/${userId}/`)
      return response.data
    } catch (error) {
      console.error('Error getting user data:', error)
      throw error.response ? error.response.data : error
    }
  },

  // POST - needs CSRF
  updateUser: async (userId, userData) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.post(
        `/update-user/${userId}/`,
        userData,
        { headers: { 'X-CSRFToken': csrfToken } },
      )
      return response.data
    } catch (error) {
      console.error('Error updating user data:', error)
      throw error.response ? error.response.data : error
    }
  },
}

export default updateUserService
