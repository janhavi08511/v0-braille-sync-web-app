"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { TabType, TranslationState } from "../input-tabs"

interface FileTabProps {
  onTranslate: (type: TabType, content: string, state: TranslationState) => Promise<void>
  state: TranslationState
  loading?: boolean
}

export function FileTab({ onTranslate, state, loading }: FileTabProps) {
  const [fileName, setFileName] = useState("")
  const [fileData, setFileData] = useState("")

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFileData(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="file-input" className="block text-lg font-medium mb-3">
          Upload a document
        </label>
        <div className="relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
          <input
            id="file-input"
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label="Upload document file"
          />
          <div>
            <p className="text-lg font-medium text-foreground mb-2">Choose a document or drag it here</p>
            <p className="text-foreground/60 text-lg">PDF, TXT, DOC, DOCX (max 50MB)</p>
          </div>
        </div>
      </div>

      {fileName && (
        <div className="border border-border rounded-lg p-4 bg-primary/5">
          <p className="text-lg text-foreground">
            <span className="font-medium">Selected file:</span> {fileName}
          </p>
        </div>
      )}

      <Button
        onClick={() => onTranslate("file", fileData, state)}
        disabled={!fileData || loading}
        size="lg"
        className="w-full"
      >
        {loading ? "Uploading..." : "Upload & Translate"}
      </Button>
    </div>
  )
}
