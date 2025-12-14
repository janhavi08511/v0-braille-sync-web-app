"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { TabType, TranslationState } from "../input-tabs"

interface ImageTabProps {
  onTranslate: (type: TabType, content: string, state: TranslationState) => Promise<void>
  state: TranslationState
  loading?: boolean
}

export function ImageTab({ onTranslate, state, loading }: ImageTabProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="image-input" className="block text-lg font-medium mb-3">
          Upload an image
        </label>
        <div className="relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label="Upload image file"
          />
          <div>
            <p className="text-lg font-medium text-foreground mb-2">Choose an image or drag it here</p>
            <p className="text-foreground/60 text-lg">JPG, PNG (max 10MB)</p>
          </div>
        </div>
      </div>

      {preview && (
        <div className="border border-border rounded-lg p-4">
          <p className="text-lg font-medium mb-3 text-foreground">Preview: {fileName}</p>
          <img src={preview || "/placeholder.svg"} alt="Preview" className="max-w-full max-h-64 mx-auto rounded" />
        </div>
      )}

      <Button
        onClick={() => onTranslate("image", preview || "", state)}
        disabled={!preview || loading}
        size="lg"
        className="w-full"
      >
        {loading ? "Processing..." : "Run OCR & Translate"}
      </Button>
    </div>
  )
}
