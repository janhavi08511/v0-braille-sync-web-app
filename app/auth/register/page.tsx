import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"

export default function RegisterPage() {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-foreground/70 text-lg">Join thousands converting to Braille</p>
        </div>

        <RegisterForm />

        <p className="mt-8 text-center text-foreground/60 text-base">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-accent hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </main>
  )
}
