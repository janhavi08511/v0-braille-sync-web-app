"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { ResultPanel } from "@/components/translation/result-panel"
import { apiClient } from "@/lib/api-client"
import type { Translation } from "@/lib/types"

export default function HistoryDetailPage() {
  const params = useParams()
  const [result, setResult] = useState<Translation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await apiClient.getHistoryItem(params.id as string)
        setResult(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load translation")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchDetail()
    }
  }, [params.id])

  return (
    <MainLayout>
      <div className="px-4 py-8 md:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Translation Details</h1>
          <p className="text-xl text-foreground/70">View the details of your translation</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-primary"></div>
            <p className="mt-4 text-lg text-foreground/70">Loading...</p>
          </div>
        ) : error ? (
          <div
            className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-6 text-lg"
            role="alert"
          >
            Error: {error}
          </div>
        ) : result ? (
          <ResultPanel result={result} />
        ) : null}
      </div>
    </MainLayout>
  )
}
