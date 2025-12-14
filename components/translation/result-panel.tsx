"use client"

import type { Translation } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ResultPanelProps {
  result: Translation
}

export function ResultPanel({ result }: ResultPanelProps) {
  const [audioPlaying, setAudioPlaying] = useState(false)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-primary/5">
        <h3 className="text-2xl font-bold text-primary">Translation Result</h3>
      </div>

      <div className="p-6 space-y-6">
        {result.inputText && (
          <div>
            <h4 className="text-xl font-semibold text-primary mb-3">Original Text</h4>
            <div className="bg-input p-4 rounded-lg border border-border text-lg text-foreground max-h-64 overflow-y-auto">
              {result.inputText}
            </div>
          </div>
        )}

        {result.outputBraille && (
          <div>
            <h4 className="text-xl font-semibold text-primary mb-3">Braille Output (Grade {result.brailleGrade})</h4>
            <div className="bg-input p-4 rounded-lg border border-border text-lg text-foreground max-h-64 overflow-y-auto font-mono">
              {result.outputBraille}
            </div>
          </div>
        )}

        {result.summary && (
          <div>
            <h4 className="text-xl font-semibold text-primary mb-3">Summary</h4>
            <div className="bg-accent/10 p-4 rounded-lg border border-accent text-lg text-foreground max-h-64 overflow-y-auto">
              {result.summary}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          {result.brfUrl && (
            <a href={result.brfUrl} download className="flex-1">
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Download .BRF
              </Button>
            </a>
          )}

          {result.txtUrl && (
            <a href={result.txtUrl} download className="flex-1">
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Download .TXT
              </Button>
            </a>
          )}

          {result.audioUrl && (
            <button onClick={() => setAudioPlaying(!audioPlaying)} className="flex-1">
              <Button className="w-full" size="lg">
                {audioPlaying ? "Stop Audio" : "Play Audio"}
              </Button>
            </button>
          )}
        </div>

        {result.audioUrl && audioPlaying && (
          <audio src={result.audioUrl} autoPlay controls className="w-full" onEnded={() => setAudioPlaying(false)} />
        )}
      </div>
    </div>
  )
}
