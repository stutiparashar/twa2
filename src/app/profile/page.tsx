'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { UserProfile } from '@/components/user-profile'

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <UserProfile />
      <Footer />
    </main>
  )
}
