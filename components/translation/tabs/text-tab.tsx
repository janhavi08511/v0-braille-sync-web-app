"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { TabType, TranslationState } from "../input-tabs"

interface TextTabProps {
  onTranslate: (type: TabType, content: string, state: TranslationState) => Promise<void>
  state: TranslationState
  loading?: boolean
}

export function TextTab({ onTranslate, state, loading }: TextTabProps) {
  const [text, setText] = useState("")

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="text-input" className="block text-lg font-medium mb-3">
          Enter or paste your text
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          className="w-full h-64 p-4 bg-input border border-border rounded-lg text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          aria-label="Text input for translation"
        />
      </div>

      <div className="text-sm text-foreground/60">
        Character count: <span className="font-semibold">{text.length}</span>
      </div>

      <Button
        onClick={() => onTranslate("text", text, state)}
        disabled={!text.trim() || loading}
        size="lg"
        className="w-full"
      >
        {loading ? "Translating..." : "Translate to Braille"}
      </Button>
    </div>
  )
}
