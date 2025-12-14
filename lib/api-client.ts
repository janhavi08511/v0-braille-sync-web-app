// Centralized API client with JWT token management

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.braillesync.example.com/api/v1"

interface ApiOptions extends RequestInit {
  skipAuth?: boolean
}

let accessToken: string | null = null

export const setAuthToken = (token: string | null) => {
  accessToken = token
}

export const getAuthToken = () => accessToken

const handleResponse = async (response: Response) => {
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

type User = {}

export const apiClient = {
  async request(endpoint: string, options: ApiOptions = {}) {
    const { skipAuth = false, ...fetchOptions } = options
    const headers: HeadersInit = {
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
  async register(email: string, password: string, name: string) {
    return this.request("/auth/register", {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify({ email, password, name }),
    })
  },

  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify({ email, password }),
    })
  },

  async getMe() {
    return this.request("/auth/me")
  },

  async updateProfile(data: Partial<User>) {
    return this.request("/auth/me", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  // Translation endpoints
  async translateText(content: string, language: string, brailleGrade: 1 | 2, summarize?: boolean) {
    return this.request("/translate/text", {
      method: "POST",
      body: JSON.stringify({ content, language, brailleGrade, summarize }),
    })
  },

  async translateImage(imageData: string, language: string, brailleGrade: 1 | 2) {
    return this.request("/translate/image", {
      method: "POST",
      body: JSON.stringify({ imageData, language, brailleGrade }),
    })
  },

  async translateFile(fileData: string, language: string, brailleGrade: 1 | 2) {
    return this.request("/translate/file", {
      method: "POST",
      body: JSON.stringify({ fileData, language, brailleGrade }),
    })
  },

  async translateBrailleToText(brailleContent: string) {
    return this.request("/translate/braille-to-text", {
      method: "POST",
      body: JSON.stringify({ content: brailleContent }),
    })
  },

  // History endpoints
  async getHistory(filters?: any) {
    const params = new URLSearchParams()
    if (filters?.dateFrom) params.append("dateFrom", filters.dateFrom)
    if (filters?.dateTo) params.append("dateTo", filters.dateTo)
    if (filters?.type) params.append("type", filters.type)

    return this.request(`/history?${params.toString()}`)
  },

  async getHistoryItem(id: string) {
    return this.request(`/history/${id}`)
  },
}
