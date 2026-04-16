'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ModuleCatalog } from '@/components/module-catalog'

export default function ModulesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ModuleCatalog />
      <Footer />
    </main>
  )
}
