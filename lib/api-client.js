// Centralized API client with JWT token management

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.braillesync.example.com/api/v1"

let accessToken = null

export const setAuthToken = (token) => {
  accessToken = token
}

export const getAuthToken = () => accessToken

/**
 * Handles API response, checks for errors, and processes 401 (unauthorized) status.
 * @param {Response} response
 * @returns {Promise<any>}
 */
const handleResponse = async (response) => {
  if (response.status === 401) {
    setAuthToken(null)
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login"
    }
    throw new Error("Session expired. Please log in again.")
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const errorMessage = data?.message || data?.error || `API error: ${response.status}`
    console.error("[BrailleSync API Error]", {
      status: response.status,
      message: errorMessage,
      endpoint: response.url,
    })
    throw new Error(errorMessage)
  }

  return data
}

export const apiClient = {
  /**
   * General API request wrapper.
   * @param {string} endpoint
   * @param {Object} [options]
   * @param {boolean} [options.skipAuth=false] - Skip adding Authorization header
   * @param {Object} [options.headers] - Custom headers
   * @returns {Promise<any>}
   */
  async request(endpoint, options = {}) {
    const { skipAuth = false, ...fetchOptions } = options
    const headers = {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    }

    if (!skipAuth && accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    })

    return handleResponse(response)
  },

  // Auth endpoints
  /**
   * @param {string} email
   * @param {string} password
   * @param {string} name
   * @returns {Promise<Object>}
   */
  async register(email, password, name) {
    return this.request("/auth/register", {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify({ email, password, name }),
    })
  },

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  async login(email, password) {
    return this.request("/auth/login", {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify({ email, password }),
    })
  },

  async getMe() {
    return this.request("/auth/me")
  },

  /**
   * @param {Object} data - Partial user data
   * @returns {Promise<Object>}
   */
  async updateProfile(data) {
    return this.request("/auth/me", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  // Translation endpoints
  /**
   * @param {string} content
   * @param {string} language
   * @param {1|2} brailleGrade - Braille grade (1 or 2)
   * @param {boolean} [summarize]
   * @returns {Promise<Object>}
   */
  async translateText(content, language, brailleGrade, summarize) {
    return this.request("/translate/text", {
      method: "POST",
      body: JSON.stringify({ content, language, brailleGrade, summarize }),
    })
  },

  /**
   * @param {string} imageData - Base64 encoded image data
   * @param {string} language
   * @param {1|2} brailleGrade - Braille grade (1 or 2)
   * @returns {Promise<Object>}
   */
  async translateImage(imageData, language, brailleGrade) {
    return this.request("/translate/image", {
      method: "POST",
      body: JSON.stringify({ imageData, language, brailleGrade }),
    })
  },

  /**
   * @param {string} fileData - Base64 encoded file data
   * @param {string} language
   * @param {1|2} brailleGrade - Braille grade (1 or 2)
   * @returns {Promise<Object>}
   */
  async translateFile(fileData, language, brailleGrade) {
    return this.request("/translate/file", {
      method: "POST",
      body: JSON.stringify({ fileData, language, brailleGrade }),
    })
  },

  /**
   * @param {string} brailleContent
   * @returns {Promise<Object>}
   */
  async translateBrailleToText(brailleContent) {
    return this.request("/translate/braille-to-text", {
      method: "POST",
      body: JSON.stringify({ content: brailleContent }),
    })
  },

  // History endpoints
  /**
   * @param {Object} [filters]
   * @returns {Promise<Object[]>}
   */
  async getHistory(filters) {
    const params = new URLSearchParams()
    if (filters?.dateFrom) params.append("dateFrom", filters.dateFrom)
    if (filters?.dateTo) params.append("dateTo", filters.dateTo)
    if (filters?.type) params.append("type", filters.type)

    return this.request(`/history?${params.toString()}`)
  },

  /**
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getHistoryItem(id) {
    return this.request(`/history/${id}`)
  },
}