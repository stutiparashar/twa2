'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Leaderboard } from '@/components/leaderboard'

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Leaderboard />
      <Footer />
    </main>
  )
}
