// src/config.js

// API configuration - updated for production
// export const API_URL = 'https://api.easy-shop.biz/api'

const isInDev = import.meta.env.VITE_NODE_ENV

const serverUrl = isInDev === 'dev' ? 'http://localhost:5173/api' : ''

export const API_URL = serverUrl

// When we export this variable this whole file runs ?

// Can also set up environment-based configuration
// export const API_URL = import.meta.env.VITE_API_URL || 'https://api.easy-shop.biz/api'
