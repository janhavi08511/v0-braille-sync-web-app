import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold text-primary">BrailleSync</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-foreground/70 text-lg">Sign in to your BrailleSync account</p>
        </div>

        <LoginForm />

        <p className="mt-8 text-center text-foreground/60 text-base">
          By signing in, you agree to our{" "}
          <a href="#" className="text-accent hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </main>
  )
}
