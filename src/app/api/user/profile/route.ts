import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/db'
import { 
  userModuleProgress, 
  userLearningPathProgress,
  userAchievements,
  achievements,
  userCertificates,
  certificates,
  users
} from '@/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // 1. Fetch User Basic Info & Stats
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId)
    })

    // 2. Fetch Progress Stats
    const completedModules = await db.select({ count: sql`count(*)` })
      .from(userModuleProgress)
      .where(and(eq(userModuleProgress.userId, userId), eq(userModuleProgress.status, 'completed')))

    const completedPaths = await db.select({ count: sql`count(*)` })
      .from(userLearningPathProgress)
      .where(and(eq(userLearningPathProgress.userId, userId), eq(userLearningPathProgress.status, 'completed')))

    // 3. Fetch Achievements (Individual Module Badges & General)
    const userAchievementsData = await db.query.userAchievements.findMany({
      where: eq(userAchievements.userId, userId),
      with: {
        achievement: true
      }
    })

    // 4. Fetch Certificates
    const userCertsData = await db.query.userCertificates.findMany({
      where: eq(userCertificates.userId, userId),
      with: {
        certificate: true
      }
    })

    return NextResponse.json({
      user,
      stats: {
        modulesCompleted: Number(completedModules[0]?.count || 0),
        pathsCompleted: Number(completedPaths[0]?.count || 0),
      },
      achievements: userAchievementsData,
      certificates: userCertsData
    })
  } catch (error) {
    console.error('Error fetching profile data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
