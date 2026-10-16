import { apiRequest } from './apiClient'

export const ocrService = {
  async extractText(file, instruction) {
    const formData = new FormData()
    formData.append('file', file)
    if (instruction) {
      formData.append('instruction', instruction)
    }

    return apiRequest('/ocr', {
      method: 'POST',
      body: formData,
    })
  },

  async getHistory(limit = 50) {
    return apiRequest(`/user/history?limit=${limit}`, {
      method: 'GET',
    })
  },

  async deleteHistory(id) {
    return apiRequest(`/user/history/${id}`, {
      method: 'DELETE',
    })
  },
}
