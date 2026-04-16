'use client'

// Mock data removed - components will fetch from database
// TODO: Implement database query to fetch platform statistics
const STATS: any[] = []

export function StatsSection() {
  return (
    <section className="w-full bg-primary/5 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-6 text-center transition-all hover:shadow-lg hover:border-primary"
              >
                <div className="mb-3 flex justify-center">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-foreground/60 font-medium">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
