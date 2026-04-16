'use client'

import { signIn } from 'next-auth/react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BookOpen } from 'lucide-react'

export default function SignInPage() {
  const providers = [
    { name: 'Wikipedia', id: 'mediawiki', color: 'bg-[#0066cc] text-white hover:opacity-90' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to continue your learning journey</p>
            </div>

            <div className="space-y-3">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  className={`flex w-full items-center justify-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${provider.color}`}
                >

                  {provider.id === 'mediawiki' && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.09 2.08a1.96 1.96 0 00-1.52.7l-6.52 6.52a2.98 2.98 0 000 4.24l4.24 4.24a2.98 2.98 0 004.24 0l6.52-6.52a1.96 1.96 0 00.7-1.52 1.96 1.96 0 00-.7-1.52l-4.24-4.24a1.96 1.96 0 00-2.12-.4l-.4.4-3.52 3.52-1.52-1.52 3.52-3.52-.7-1.18z" />
                    </svg>
                  )}
                  Continue with {provider.name}
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
