import { useState, useEffect } from 'react'

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuthStatus = () => {
    try {
      const userData = localStorage.getItem('user')

      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsLoggedIn(true)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      setUser(null)
      setIsLoggedIn(false)
      localStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuthStatus()

    // Listen for storage changes (logout in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        checkAuthStatus()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return { isLoggedIn, user, loading, checkAuthStatus }
}

export default useAuth
