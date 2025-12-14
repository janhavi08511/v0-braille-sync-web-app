"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { auth } from "@/lib/auth"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    auth.logout()
  }

  if (!user) return null

  const isActive = (href: string) => pathname === href

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/translate", label: "Translate" },
    { href: "/history", label: "History" },
    { href: "/settings", label: "Settings" },
  ]

  return (
    <nav className="sticky top-0 bg-primary border-b border-primary/20 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-lg">B</span>
          </div>
          <span className="text-xl font-bold text-primary-foreground hidden sm:inline">BrailleSync</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium transition-colors ${
                isActive(link.href)
                  ? "text-accent border-b-2 border-accent pb-1"
                  : "text-primary-foreground hover:text-accent"
              }`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-primary-foreground font-medium">{user.name}</p>
            <p className="text-primary-foreground/70 text-sm">{user.email}</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary font-bold hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="User menu"
              aria-expanded={dropdownOpen}
            >
              {user.name.charAt(0).toUpperCase()}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg">
                <Link
                  href="/settings"
                  className="block px-4 py-3 text-lg text-foreground hover:bg-muted rounded-t-lg"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-lg text-destructive hover:bg-muted rounded-b-lg font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden bg-primary/95 border-t border-primary/20">
        <div className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 text-lg font-medium border-b border-primary/20 ${
                isActive(link.href) ? "text-accent bg-primary/50" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
