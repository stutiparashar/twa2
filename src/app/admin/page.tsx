'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AdminModuleEditor } from '@/components/admin-module-editor'

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AdminModuleEditor />
      <Footer />
    </main>
  )
}
