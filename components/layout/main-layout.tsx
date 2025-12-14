"use client"

import type React from "react"
import { Navbar } from "./navbar"
import { SkipLink } from "./skip-link"
import { ProtectedRoute } from "@/components/auth/protected-route"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SkipLink />
        <Navbar />
        <main id="main-content" className="max-w-7xl mx-auto" role="main">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}
