"use client"

import { useEffect, useState } from "react"
import type { User } from "@/lib/types"
import { auth } from "@/lib/auth"
import { apiClient } from "@/lib/api-client"

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await auth.initialize()
        if (auth.isAuthenticated()) {
          const userData = await apiClient.getMe()
          setUser(userData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Auth error")
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  return { user, loading, error, isAuthenticated: auth.isAuthenticated() }
}
