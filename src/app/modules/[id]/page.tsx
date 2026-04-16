'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ModulePlayScreen } from '@/components/module-play-screen'

export default function ModulePlayPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ModulePlayScreen moduleId={params.id} />
      <Footer />
    </main>
  )
}
