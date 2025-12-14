import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 bg-primary/95 backdrop-blur-sm border-b border-primary/20 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-primary-foreground">BrailleSync</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-primary bg-transparent"
                size="lg"
              >
                Log In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-primary mb-6">Convert to Braille, Instantly</h1>
        <p className="text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          Transform text, images, speech, and documents into Grade 1 & 2 Braille with one powerful platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth/register">
            <Button size="lg" className="px-8 py-6 text-lg">
              Get Started
            </Button>
          </Link>
          <Link href="#demo">
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg bg-transparent">
              Try Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-primary/5 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-colors">
              <h3 className="text-2xl font-bold text-primary mb-4">Optical Character Recognition</h3>
              <p className="text-lg text-foreground/70">Upload images and instantly convert printed text to Braille.</p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-colors">
              <h3 className="text-2xl font-bold text-primary mb-4">Speech-to-Braille</h3>
              <p className="text-lg text-foreground/70">
                Speak or upload audio files and have them converted to Braille text.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-colors">
              <h3 className="text-2xl font-bold text-primary mb-4">Braille-to-Text</h3>
              <p className="text-lg text-foreground/70">Reverse translation from Braille to readable text format.</p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-colors">
              <h3 className="text-2xl font-bold text-primary mb-4">Smart Summarization</h3>
              <p className="text-lg text-foreground/70">Automatically condense long documents before translation.</p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-colors">
              <h3 className="text-2xl font-bold text-primary mb-4">File Export</h3>
              <p className="text-lg text-foreground/70">Download results as .BRF, .TXT, or audio formats.</p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-colors">
              <h3 className="text-2xl font-bold text-primary mb-4">Grade 1 & 2 Support</h3>
              <p className="text-lg text-foreground/70">Choose your preferred Braille grade for all translations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">Choose Your Input</h3>
            <p className="text-lg text-foreground/70">Text, Image, File, Audio, or Braille input</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">Translation Engine</h3>
            <p className="text-lg text-foreground/70">Advanced processing with OCR, STT, and NLP</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">Get Your Output</h3>
            <p className="text-lg text-foreground/70">Download Braille or play audio instantly</p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="bg-primary/5 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-8 text-center">Try It Now</h2>
          <div className="bg-card p-8 rounded-lg border border-border">
            <label htmlFor="demo-input" className="block mb-4 text-lg font-medium">
              Enter text to convert:
            </label>
            <textarea
              id="demo-input"
              placeholder="Type something to see a preview..."
              className="w-full p-4 mb-4 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              rows={4}
            />
            <p className="text-lg text-foreground/60 italic">
              (Demo shows placeholder - actual conversion requires full account)
            </p>
            <Link href="/auth/register" className="block mt-6">
              <Button size="lg" className="w-full">
                Sign Up to Start Converting
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">BrailleSync</h3>
              <p className="text-primary-foreground/70">Making Braille accessible to everyone.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary-foreground">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2025 BrailleSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}