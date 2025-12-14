"use client"

import { useAuth } from "@/hooks/use-auth"
import { MainLayout } from "@/components/layout/main-layout"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentTranslations } from "@/components/dashboard/recent-translations"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <MainLayout>
      <div className="px-4 py-8 md:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome, {user?.name}!</h1>
          <p className="text-xl text-foreground/70">Convert your content to Braille quickly and easily</p>
        </div>

        <QuickActions />

        <div>
          <h2 className="text-3xl font-bold text-primary mb-6">Your Recent Activity</h2>
          <RecentTranslations />
        </div>
      </div>
    </MainLayout>
  )
}
