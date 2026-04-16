'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, BarChart3, ChevronRight, Award } from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

export default function PathsPage() {
  const [paths, setPaths] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/learning-paths')
      .then(res => res.json())
      .then(data => {
        setPaths(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="w-full bg-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Learning Paths
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl">
              Structured journeys designed to help you master specific Wikipedia skills and knowledge areas.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[400px] rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : paths.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed rounded-2xl">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium">No learning paths found</h3>
              <p className="text-muted-foreground mt-1">Check back later for new structured content!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paths.map((path) => (
                <Card key={path.id} className="group overflow-hidden flex flex-col h-full hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20">
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    {path.coverImage ? (
                      <img 
                        src={path.coverImage} 
                        alt={path.title} 
                        className="h-full w-full object-cover transition-transform group-hover:scale-105" 
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary/10">
                        <BookOpen className="h-12 w-12 text-primary/40" />
                      </div>
                    )}
                    <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background">
                      {path.difficulty}
                    </Badge>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl line-clamp-1">{path.title}</CardTitle>
                    <CardDescription className="line-clamp-2 min-h-[40px]">
                      {path.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{path.estimatedTime || 'Self-paced'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BarChart3 className="h-4 w-4" />
                        <span>{path.modules?.length || 0} Modules</span>
                      </div>
                    </div>

                    {/* Completion status - would be calculated based on user progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground uppercase tracking-wider">Progress</span>
                        <span className="text-primary">0%</span>
                      </div>
                      <Progress value={0} className="h-1.5" />
                    </div>

                    <div className="flex items-center gap-2 pt-2 text-sm font-medium text-secondary">
                      <Award className="h-4 w-4" />
                      <span>Earns Certificate</span>
                    </div>

                    <div className="pt-4 mt-auto">
                      <Link href={`/paths/${path.id}`} className="block">
                        <Button className="w-full group-hover:bg-primary transition-colors py-6 text-lg">
                          Explore Path
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
