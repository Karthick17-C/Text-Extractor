import { useState, useEffect } from 'react'
import { STORAGE_KEYS } from '../utils/constants'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || '')
  const [user, setUser] = useState(() => {
    const name = localStorage.getItem(STORAGE_KEYS.USER_NAME)
    const email = localStorage.getItem(STORAGE_KEYS.USER_EMAIL)
    return token ? { name, email } : null
  })

  const login = (userData) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, userData.token)
    localStorage.setItem(STORAGE_KEYS.USER_NAME, userData.name || '')
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email || '')
    setToken(userData.token)
    setUser({ name: userData.name, email: userData.email })
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER_NAME)
    localStorage.removeItem(STORAGE_KEYS.USER_EMAIL)
    setToken('')
    setUser(null)
  }

  useEffect(() => {
    const handleAuthExpired = () => {
      setToken('')
      setUser(null)
      localStorage.removeItem(STORAGE_KEYS.USER_NAME)
      localStorage.removeItem(STORAGE_KEYS.USER_EMAIL)
    }

    window.addEventListener('auth-expired', handleAuthExpired)
    return () => window.removeEventListener('auth-expired', handleAuthExpired)
  }, [])

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
