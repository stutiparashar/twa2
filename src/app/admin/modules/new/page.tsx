'use client';

import { ModuleWizard } from '@/components/admin/module-wizard';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function NewModulePage() {
  const router = useRouter();

  const handleComplete = () => {
    // Redirect back to modules list after successful creation
    router.push('/admin');
  };

  const handleCancel = () => {
    // Redirect back to modules list on cancel
    router.push('/admin');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <ModuleWizard onComplete={handleComplete} onCancel={handleCancel} />
        </div>
      </div>
      <Footer />
    </>
  );
}