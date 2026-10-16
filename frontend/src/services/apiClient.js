import { API_URL, STORAGE_KEYS } from '../utils/constants'

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  const isFormData = options.body instanceof FormData
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      window.dispatchEvent(new Event('auth-expired'))
    }

    const errorMessage =
      data.message ||
      data.error ||
      data.detail ||
      (Array.isArray(data.non_field_errors) && data.non_field_errors[0]) ||
      'Request failed'
    throw new Error(errorMessage)
  }

  return data
}
