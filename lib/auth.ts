// Authentication helper functions

import type { User } from "./types"
import { apiClient, setAuthToken, getAuthToken } from "./api-client"

const AUTH_TOKEN_KEY = "braillesync_token"

export const auth = {
  async initialize() {
    // Check if token exists in storage and validate it
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      if (token) {
        setAuthToken(token)
        try {
          await apiClient.getMe()
        } catch (error) {
          localStorage.removeItem(AUTH_TOKEN_KEY)
          setAuthToken(null)
        }
      }
    }
  },

  async login(email: string, password: string) {
    const response = await apiClient.login(email, password)
    if (response.accessToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.accessToken)
      setAuthToken(response.accessToken)
    }
    return response.user as User
  },

  async register(email: string, password: string, name: string) {
    const response = await apiClient.register(email, password, name)
    if (response.accessToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.accessToken)
      setAuthToken(response.accessToken)
    }
    return response.user as User
  },

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setAuthToken(null)
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login"
    }
  },

  getToken() {
    return getAuthToken()
  },

  isAuthenticated() {
    return !!getAuthToken()
  },
}
