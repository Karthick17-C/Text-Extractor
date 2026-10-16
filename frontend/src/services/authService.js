import { apiRequest } from './apiClient'

export const authService = {
  async signup(name, email, password) {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  },

  async login(email, password, rememberMe = false) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, rememberMe }),
    })
  },

  async getProfile() {
    return apiRequest('/user/profile', {
      method: 'GET',
    })
  },
}
