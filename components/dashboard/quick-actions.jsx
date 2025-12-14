import Link from "next/link"

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <Link href="/translate" className="block">
        <div className="bg-card border border-border hover:border-accent transition-colors p-6 rounded-lg cursor-pointer h-full">
          <h3 className="text-xl font-bold text-primary mb-2">New Translation</h3>
          <p className="text-foreground/70 text-lg">Start converting your content</p>
        </div>
      </Link>

      <Link href="/history" className="block">
        <div className="bg-card border border-border hover:border-accent transition-colors p-6 rounded-lg cursor-pointer h-full">
          <h3 className="text-xl font-bold text-primary mb-2">View History</h3>
          <p className="text-foreground/70 text-lg">Access past translations</p>
        </div>
      </Link>

      <Link href="/settings" className="block">
        <div className="bg-card border border-border hover:border-accent transition-colors p-6 rounded-lg cursor-pointer h-full">
          <h3 className="text-xl font-bold text-primary mb-2">Settings</h3>
          <p className="text-foreground/70 text-lg">Customize your preferences</p>
        </div>
      </Link>
    </div>
  )
}
