'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Clock, 
  BarChart3, 
  ChevronRight, 
  Award, 
  CheckCircle2, 
  Lock,
  Play,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { useParams, useRouter } from 'next/navigation'

export default function PathDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [path, setPath] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/learning-paths/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setPath(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto py-20 px-4 space-y-8 animate-pulse">
           <div className="h-8 w-1/3 bg-muted rounded" />
           <div className="h-4 w-full bg-muted rounded" />
           <div className="h-64 w-full bg-muted rounded" />
        </div>
      </div>
    )
  }

  if (!path) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto py-20 px-4 text-center">
          <h2 className="text-2xl font-bold">Path not found</h2>
          <Button onClick={() => router.push('/paths')} className="mt-4">Back to Paths</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <div className="relative w-full h-[350px] overflow-hidden">
        {path.coverImage ? (
          <img src={path.coverImage} className="w-full h-full object-cover brightness-[0.4]" alt="" />
        ) : (
          <div className="w-full h-full bg-primary/20" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl w-full px-6 space-y-4">
            <Link href="/paths" className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Paths
            </Link>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-[10px] font-bold">
                {path.difficulty}
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white backdrop-blur-md uppercase tracking-widest text-[10px] font-bold">
                {path.estimatedTime}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {path.title}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              {path.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-2 space-y-10 group">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-3 italic">
              <BarChart3 className="h-6 w-6 text-primary" />
              Your Progress
            </h2>
            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              {/* Calculating progress based on completed modules */}
              0 / {path.modules?.length || 0} Modules Completed
            </span>
          </div>

          <div className="relative space-y-12 before:absolute before:inset-0 before:left-6 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/20 before:via-primary/40 before:to-transparent">
            {path.modules?.map((lpm: any, idx: number) => {
              const module = lpm.module
              return (
                <div key={lpm.id} className="relative pl-16 group/item">
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background shadow-xl transition-all duration-300 group-hover/item:scale-110 ${
                    idx === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {idx + 1}
                  </div>
                  
                  <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-2xl transition-all duration-300 group-hover/item:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover/item:text-primary">
                            {module.title}
                          </h3>
                          {/* Completed Icon check */}
                        </div>
                        <p className="text-sm text-foreground/60 leading-relaxed italic line-clamp-2">
                          {module.description}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground/50 bg-muted/50 px-2 py-1 rounded-md">
                            <Clock className="h-3.5 w-3.5" /> {module.estimatedTime}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground/50 bg-muted/50 px-2 py-1 rounded-md">
                            <BarChart3 className="h-3.5 w-3.5" /> {module.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <Link href={`/modules/${module.id}?pathId=${path.id}`} className="shrink-0">
                        <Button className="w-full md:w-auto px-8 rounded-full shadow-lg shadow-primary/20 group-hover/item:scale-105 transition-transform font-bold tracking-wide">
                          <Play className="mr-2 h-4 w-4 fill-current" /> Start Module
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Path Info & Rewards */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-primary text-primary-foreground shadow-2xl shadow-primary/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
            <h3 className="text-2xl font-extrabold mb-4 italic tracking-tight">Mastery Reward</h3>
            <p className="text-primary-foreground/90 text-sm leading-relaxed mb-6 font-medium">
              Complete every stage of this journey to earn the official <strong>Certificate of Completion</strong> and showcase your expertise.
            </p>
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center border border-white/20">
                <Award className="h-8 w-8 text-white animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-bold opacity-100">Official Certificate</p>
                <p className="text-[10px] font-medium opacity-70 uppercase tracking-widest">Digital Badge Included</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-border bg-card shadow-lg space-y-6">
             <h3 className="text-xl font-bold tracking-tight">Path Details</h3>
             <div className="space-y-5">
               <div className="flex items-start gap-4">
                 <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                   <Lock className="h-4 w-4" />
                 </div>
                 <div>
                   <p className="text-sm font-bold">{path.isSequential ? 'Strict Sequential' : 'Flexible Pursuit'}</p>
                   <p className="text-xs text-muted-foreground mt-0.5">
                     {path.isSequential ? 'Unlock modules one by one' : 'Complete modules in any order'}
                   </p>
                 </div>
               </div>
               
               {path.prerequisites && (
                 <div className="flex items-start gap-4">
                   <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                     <CheckCircle2 className="h-4 w-4" />
                   </div>
                   <div>
                     <p className="text-sm font-bold">Prerequisites</p>
                     <p className="text-xs text-muted-foreground mt-0.5">{path.prerequisites}</p>
                   </div>
                 </div>
               )}

               <div className="flex items-start gap-4">
                 <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                   <BarChart3 className="h-4 w-4" />
                 </div>
                 <div>
                   <p className="text-sm font-bold">Curated Content</p>
                   <p className="text-xs text-muted-foreground mt-0.5">Hand-picked high quality modules</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
