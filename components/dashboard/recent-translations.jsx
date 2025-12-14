"use client"

import { useEffect, useState } from "react"
import type { Translation } from "@/lib/types"
import { apiClient } from "@/lib/api-client"
import Link from "next/link"

export function RecentTranslations() {
  const [translations, setTranslations] = useState<Translation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const data = await apiClient.getHistory()
        setTranslations(data.slice(0, 3) || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load history")
      } finally {
        setLoading(false)
      }
    }

    fetchTranslations()
  }, [])

  if (loading) {
    return <div className="text-lg text-foreground/70">Loading recent translations...</div>
  }

  if (error) {
    return <div className="text-lg text-destructive">Error: {error}</div>
  }

  if (translations.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-lg text-foreground/70 mb-4">No translations yet</p>
        <Link href="/translate">
          <button className="text-accent font-semibold text-lg hover:underline">Start your first translation</button>
        </Link>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getInputTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      text: "Text",
      image: "Image",
      file: "File",
      audio: "Audio",
      braille: "Braille",
    }
    return labels[type] || type
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-2xl font-bold text-primary">Recent Translations</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/5 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-lg font-semibold text-primary">Date</th>
              <th className="px-6 py-4 text-left text-lg font-semibold text-primary">Type</th>
              <th className="px-6 py-4 text-left text-lg font-semibold text-primary">Language</th>
              <th className="px-6 py-4 text-left text-lg font-semibold text-primary">Grade</th>
              <th className="px-6 py-4 text-left text-lg font-semibold text-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {translations.map((translation) => (
              <tr key={translation.id} className="border-b border-border hover:bg-primary/5 transition-colors">
                <td className="px-6 py-4 text-lg text-foreground">{formatDate(translation.createdAt)}</td>
                <td className="px-6 py-4 text-lg text-foreground">{getInputTypeLabel(translation.inputType)}</td>
                <td className="px-6 py-4 text-lg text-foreground">{translation.language}</td>
                <td className="px-6 py-4 text-lg text-foreground">Grade {translation.brailleGrade}</td>
                <td className="px-6 py-4">
                  <Link href={`/history/${translation.id}`}>
                    <button className="text-accent font-semibold text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
