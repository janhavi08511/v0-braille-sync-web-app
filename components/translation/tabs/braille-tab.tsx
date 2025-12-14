"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { TabType, TranslationState } from "../input-tabs"

interface BrailleTabProps {
  onTranslate: (type: TabType, content: string, state: TranslationState) => Promise<void>
  state: TranslationState
  loading?: boolean
}

export function BrailleTab({ onTranslate, state, loading }: BrailleTabProps) {
  const [braille, setBraille] = useState("")

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="braille-input" className="block text-lg font-medium mb-3">
          Paste Braille content
        </label>
        <textarea
          id="braille-input"
          value={braille}
          onChange={(e) => setBraille(e.target.value)}
          placeholder="Paste Braille Unicode characters here..."
          className="w-full h-64 p-4 bg-input border border-border rounded-lg text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none font-mono"
          aria-label="Braille input for reverse translation"
        />
      </div>

      <Button
        onClick={() => onTranslate("braille", braille, state)}
        disabled={!braille.trim() || loading}
        size="lg"
        className="w-full"
      >
        {loading ? "Converting..." : "Convert to Text"}
      </Button>
    </div>
  )
}
