"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { InputTabs, type TabType, type TranslationState } from "@/components/translation/input-tabs"
import { ResultPanel } from "@/components/translation/result-panel"
import { apiClient } from "@/lib/api-client"
import type { Translation } from "@/lib/types"

export default function TranslatePage() {
  const [result, setResult] = useState<Translation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTranslate = async (type: TabType, content: string, state: TranslationState) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      let response

      switch (type) {
        case "text":
          response = await apiClient.translateText(content, state.language, state.brailleGrade, state.summarize)
          break
        case "image":
          response = await apiClient.translateImage(content, state.language, state.brailleGrade)
          break
        case "file":
          response = await apiClient.translateFile(content, state.language, state.brailleGrade)
          break
        case "braille":
          response = await apiClient.translateBrailleToText(content)
          break
      }

      setResult(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="px-4 py-8 md:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">New Translation</h1>
          <p className="text-xl text-foreground/70">Choose an input type and configure your translation settings</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <InputTabs onTranslate={handleTranslate} loading={loading} />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-4">Translation Info</h3>
              <div className="space-y-3 text-lg">
                <div>
                  <p className="text-foreground/60">Supported Formats</p>
                  <p className="text-foreground font-medium">Text, PDF, Images, Audio</p>
                </div>
                <div>
                  <p className="text-foreground/60">Output Formats</p>
                  <p className="text-foreground font-medium">.BRF, .TXT, Audio</p>
                </div>
                <div>
                  <p className="text-foreground/60">Processing Time</p>
                  <p className="text-foreground font-medium">Typically under 30 seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div
            className="mt-8 p-4 bg-destructive/10 border border-destructive text-destructive rounded-lg"
            role="alert"
          >
            <p className="text-lg font-semibold">Error</p>
            <p className="text-lg">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8">
            <ResultPanel result={result} />
          </div>
        )}
      </div>
    </MainLayout>
  )
}
