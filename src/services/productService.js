import axios from 'axios'
import { API_URL } from '../config'
import { fetchCsrfToken } from '../utils/csrfUtils' // ← import shared helper

// ==================================================================
// Regular axios instance for public endpoints
// ==================================================================
const publicAxios = axios.create({
  baseURL: API_URL,
})

// ==================================================================
// Axios instance for protected endpoints
// ==================================================================
const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const productService = {
  // ==================================================================
  // GET - no CSRF needed
  // ==================================================================
  getPublicProducts: async ({
    page = 1,
    pageSize = 9,
    category = null,
  } = {}) => {
    try {
      let url = '/products/'
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('pageSize', pageSize.toString())
      if (category) {
        params.append('category', category)
      }
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      const response = await publicAxios.get(url)
      return response.data
    } catch (error) {
      console.error('Error fetching public products:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // GET - no CSRF needed
  // ==================================================================
  getPublicProductById: async (productId) => {
    try {
      const response = await publicAxios.get(`/products/${productId}/`)
      return response.data
    } catch (error) {
      console.error('Error fetching public product details:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // GET - no CSRF needed
  // ==================================================================
  getCustomerProducts: async () => {
    try {
      const response = await authAxios.get('/customer-products/')
      return response.data
    } catch (error) {
      console.error('Error fetching customer products:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // GET - no CSRF needed
  // ==================================================================
  getCustomerProductById: async (productId) => {
    try {
      const response = await authAxios.get(`/customer-products/${productId}/`)
      return response.data
    } catch (error) {
      console.error('Error fetching customer product:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // POST - needs CSRF
  // ==================================================================
  addProduct: async (formData) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.post('/add-product/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error adding product:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // POST - needs CSRF
  // ==================================================================
  updateProduct: async (productId, formData) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.post(
        `/customer-products/${productId}/update/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrfToken,
          },
        },
      )
      return response.data
    } catch (error) {
      console.error('Error updating product:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // DELETE - needs CSRF
  // ==================================================================
  deleteProduct: async (productId) => {
    try {
      const csrfToken = await fetchCsrfToken() // ← get token from response body

      const response = await authAxios.delete(
        `/customer-products/${productId}/delete/`,
        { headers: { 'X-CSRFToken': csrfToken } },
      )
      return response.data
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // GET - no CSRF needed
  // ==================================================================
  searchProducts: async (query) => {
    try {
      const response = await publicAxios.get(
        `/products/search/?q=${encodeURIComponent(query)}`,
      )
      return response.data
    } catch (error) {
      console.error('Error searching products:', error)
      throw error.response ? error.response.data : error
    }
  },
}

export default productService
