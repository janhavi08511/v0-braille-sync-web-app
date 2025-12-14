"use client"

import { useEffect, useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { apiClient } from "@/lib/api-client"
import type { Translation, HistoryFilter } from "@/lib/types"
import Link from "next/link"

export default function HistoryPage() {
  const [translations, setTranslations] = useState<Translation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<HistoryFilter>({})

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getHistory(filters)
        setTranslations(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load history")
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [filters])

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
    <MainLayout>
      <div className="px-4 py-8 md:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Translation History</h1>
          <p className="text-xl text-foreground/70">View and manage your past translations</p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Filters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="filter-type" className="block text-lg font-medium mb-2">
                Type
              </label>
              <select
                id="filter-type"
                value={filters.type || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    type: (e.target.value as any) || undefined,
                  })
                }
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">All Types</option>
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="file">File</option>
                <option value="audio">Audio</option>
                <option value="braille">Braille</option>
              </select>
            </div>

            <div>
              <label htmlFor="filter-from" className="block text-lg font-medium mb-2">
                From Date
              </label>
              <input
                id="filter-from"
                type="date"
                value={filters.dateFrom || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    dateFrom: e.target.value || undefined,
                  })
                }
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="filter-to" className="block text-lg font-medium mb-2">
                To Date
              </label>
              <input
                id="filter-to"
                type="date"
                value={filters.dateTo || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    dateTo: e.target.value || undefined,
                  })
                }
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-primary"></div>
            <p className="mt-4 text-lg text-foreground/70">Loading translations...</p>
          </div>
        ) : error ? (
          <div
            className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-6 text-lg"
            role="alert"
          >
            Error: {error}
          </div>
        ) : translations.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <p className="text-xl text-foreground/70 mb-4">No translations found</p>
            <Link href="/translate" className="text-accent font-semibold text-lg hover:underline">
              Start your first translation
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
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
        )}
      </div>
    </MainLayout>
  )
}
