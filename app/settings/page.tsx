"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { useAuth } from "@/hooks/use-auth"
import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    defaultLanguage: user?.defaultLanguage || "English",
    defaultBrailleGrade: user?.defaultBrailleGrade || 1,
    enableSummarization: user?.enableSummarization || false,
    enableHighContrast: user?.enableHighContrast || false,
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const inputElement = e.target as HTMLInputElement

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? inputElement.checked : name === "defaultBrailleGrade" ? Number.parseInt(value) : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    try {
      await apiClient.updateProfile(formData)
      setSuccess("Settings saved successfully!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="px-4 py-8 md:px-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Settings</h1>
          <p className="text-xl text-foreground/70">Manage your account preferences</p>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-primary/5">
            <h2 className="text-2xl font-bold text-primary">Profile Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2">
                  Email (Read-only)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground/50 text-lg cursor-not-allowed"
                  aria-label="Email address"
                />
              </div>
            </div>

            <hr className="border-border" />

            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">Default Preferences</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="language" className="block text-lg font-medium mb-2">
                    Default Language
                  </label>
                  <select
                    id="language"
                    name="defaultLanguage"
                    value={formData.defaultLanguage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Marathi</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="grade" className="block text-lg font-medium mb-2">
                    Default Braille Grade
                  </label>
                  <select
                    id="grade"
                    name="defaultBrailleGrade"
                    value={formData.defaultBrailleGrade}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value={1}>Grade 1 (Uncontracted)</option>
                    <option value={2}>Grade 2 (Contracted)</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-border" />

            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">Accessibility & Features</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer text-lg">
                  <input
                    name="enableSummarization"
                    type="checkbox"
                    checked={formData.enableSummarization}
                    onChange={handleChange}
                    className="w-5 h-5 accent-accent cursor-pointer"
                    aria-label="Enable summarization by default"
                  />
                  <span>
                    <span className="font-medium">Enable Summarization by Default</span>
                    <p className="text-foreground/60 text-base">Automatically summarize long documents</p>
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-lg">
                  <input
                    name="enableHighContrast"
                    type="checkbox"
                    checked={formData.enableHighContrast}
                    onChange={handleChange}
                    className="w-5 h-5 accent-accent cursor-pointer"
                    aria-label="Enable high contrast mode"
                  />
                  <span>
                    <span className="font-medium">Enable High Contrast Mode</span>
                    <p className="text-foreground/60 text-base">Improve readability with higher contrast colors</p>
                  </span>
                </label>
              </div>
            </div>

            {success && (
              <div
                className="p-4 bg-accent/10 border border-accent text-accent rounded-lg text-lg font-medium"
                role="status"
              >
                {success}
              </div>
            )}

            {error && (
              <div
                className="p-4 bg-destructive/10 border border-destructive text-destructive rounded-lg text-lg font-medium"
                role="alert"
              >
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} size="lg" className="w-full">
              {loading ? "Saving..." : "Save Settings"}
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
