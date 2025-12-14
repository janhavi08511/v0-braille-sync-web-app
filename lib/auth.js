// Authentication helper functions

import { apiClient, setAuthToken, getAuthToken } from "./api-client"

const AUTH_TOKEN_KEY = "braillesync_token"

export const auth = {
  /**
   * Initializes authentication by checking for a token in localStorage and validating it with the API.
   * @returns {Promise<void>}
   */
  async initialize() {
    // Check if token exists in storage and validate it
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      if (token) {
        setAuthToken(token)
        try {
          // This call validates the token
          await apiClient.getMe()
        } catch (error) {
          // If token is invalid/expired, clear it
          localStorage.removeItem(AUTH_TOKEN_KEY)
          setAuthToken(null)
        }
      }
    }
  },

  /**
   * Logs a user in and stores the access token.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} The user object.
   */
  async login(email, password) {
    const response = await apiClient.login(email, password)
    if (response.accessToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.accessToken)
      setAuthToken(response.accessToken)
    }
    return response.user
  },

  /**
   * Registers a new user and logs them in automatically.
   * @param {string} email
   * @param {string} password
   * @param {string} name
   * @returns {Promise<Object>} The user object.
   */
  async register(email, password, name) {
    const response = await apiClient.register(email, password, name)
    if (response.accessToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.accessToken)
      setAuthToken(response.accessToken)
    }
    return response.user
  },

  /**
   * Logs the user out and redirects to the login page.
   */
  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setAuthToken(null)
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login"
    }
  },

  /**
   * Gets the current access token.
   * @returns {string|null}
   */
  getToken() {
    return getAuthToken()
  },

  /**
   * Checks if a user is currently authenticated.
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!getAuthToken()
  },
}