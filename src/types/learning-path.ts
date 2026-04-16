import { Module, ModuleCategory, ModuleDifficulty, ModuleStatus } from './module'

export interface LearningPath {
  id: number
  title: string
  description: string
  coverImage?: string | null
  difficulty: ModuleDifficulty
  estimatedTime?: string | null
  prerequisites?: string | null
  isSequential: boolean
  status: ModuleStatus
  authorId: string
  certificateId?: number | null
  createdAt: Date
  updatedAt: Date
  modules?: LearningPathModule[]
}

export interface LearningPathModule {
  id: number
  learningPathId: number
  moduleId: number
  sortOrder: number
  createdAt: Date
  module?: Module
}

export interface LearningPathFormData {
  title: string
  description: string
  coverImage?: string
  difficulty: ModuleDifficulty
  estimatedTime: string
  prerequisites: string
  isSequential: boolean
  status: ModuleStatus
  modules: {
    moduleId: number
    sortOrder: number
    module?: Module // For display purposes in wizard
  }[]
  certificate: {
    title: string
    description: string
    image?: string
  }
}
