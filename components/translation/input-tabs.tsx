"use client"

import { useState } from "react"
import { TextTab } from "./tabs/text-tab"
import { ImageTab } from "./tabs/image-tab"
import { FileTab } from "./tabs/file-tab"
import { BrailleTab } from "./tabs/braille-tab"

export type TabType = "text" | "image" | "file" | "braille"

export interface TranslationState {
  language: string
  brailleGrade: 1 | 2
  summarize: boolean
}

interface InputTabsProps {
  onTranslate: (type: TabType, content: string, state: TranslationState) => Promise<void>
  loading?: boolean
}

export function InputTabs({ onTranslate, loading = false }: InputTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("text")
  const [state, setState] = useState<TranslationState>({
    language: "English",
    brailleGrade: 1,
    summarize: false,
  })

  const tabs: { id: TabType; label: string }[] = [
    { id: "text", label: "Text" },
    { id: "image", label: "Image" },
    { id: "file", label: "File" },
    { id: "braille", label: "Braille to Text" },
  ]

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-accent -mb-px ${
              activeTab === tab.id ? "text-accent border-b-2 border-accent" : "text-foreground/70 hover:text-foreground"
            }`}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Options Bar */}
      <div className="bg-primary/5 border-b border-border px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="language" className="block text-lg font-medium mb-2">
            Language
          </label>
          <select
            id="language"
            value={state.language}
            onChange={(e) => setState({ ...state, language: e.target.value })}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent"
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
            Braille Grade
          </label>
          <select
            id="grade"
            value={state.brailleGrade}
            onChange={(e) => setState({ ...state, brailleGrade: Number.parseInt(e.target.value) as 1 | 2 })}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value={1}>Grade 1 (Uncontracted)</option>
            <option value={2}>Grade 2 (Contracted)</option>
          </select>
        </div>

        <div className="flex items-end">
          <label htmlFor="summarize" className="flex items-center gap-3 cursor-pointer text-lg">
            <input
              id="summarize"
              type="checkbox"
              checked={state.summarize}
              onChange={(e) => setState({ ...state, summarize: e.target.checked })}
              className="w-5 h-5 accent-accent cursor-pointer"
              aria-label="Enable summarization"
            />
            <span className="font-medium">Summarize before translation</span>
          </label>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "text" && <TextTab onTranslate={onTranslate} state={state} loading={loading} />}
        {activeTab === "image" && <ImageTab onTranslate={onTranslate} state={state} loading={loading} />}
        {activeTab === "file" && <FileTab onTranslate={onTranslate} state={state} loading={loading} />}
        {activeTab === "braille" && <BrailleTab onTranslate={onTranslate} state={state} loading={loading} />}
      </div>
    </div>
  )
}
