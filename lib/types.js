
// TypeScript interfaces for BrailleSync

export interface User {
  id: string
  name: string
  email: string
  defaultLanguage?: string
  defaultBrailleGrade?: 1 | 2
  enableSummarization?: boolean
  enableHighContrast?: boolean
  createdAt: string
}

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface Translation {
  id: string
  userId: string
  inputType: "text" | "image" | "file" | "audio" | "braille"
  inputText?: string
  outputBraille?: string
  summary?: string
  language: string
  brailleGrade: 1 | 2
  audioUrl?: string
  fileUrl?: string
  brfUrl?: string
  txtUrl?: string
  createdAt: string
}

export interface TranslationRequest {
  inputType: "text" | "image" | "file" | "audio" | "braille"
  content: string
  language: string
  brailleGrade: 1 | 2
  summarize?: boolean
}

export interface HistoryFilter {
  dateFrom?: string
  dateTo?: string
  type?: "text" | "image" | "file" | "audio" | "braille"
}
