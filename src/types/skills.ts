export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  requiredLevel: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  avatar?: string;
  isExpert: boolean;
  availability: 'available' | 'busy' | 'offline';
}

export interface SkillAssessment {
  employeeId: string;
  skillId: string;
  currentLevel: number;
  targetLevel: number;
  lastAssessed: string;
  assessedBy: string;
  certifications: string[];
}

export interface TrainingProgram {
  id: string;
  name: string;
  skillIds: string[];
  duration: number; // in hours
  completionRate: number;
  enrolledCount: number;
  status: 'active' | 'planned' | 'completed';
}

export interface KnowledgeResource {
  id: string;
  title: string;
  type: 'video' | 'document' | 'presentation' | 'best-practice';
  skillIds: string[];
  author: string;
  tags: string[];
  views: number;
  rating: number;
  lastUpdated: string;
}

export enum SkillCategory {
  TECHNICAL = 'technical',
  PRODUCT = 'product', 
  SALES = 'sales',
  COMMUNICATION = 'communication',
  INDUSTRY = 'industry',
  TOOLS = 'tools'
}

export interface DashboardMetrics {
  totalEmployees: number;
  averageSkillLevel: number;
  skillsGapCount: number;
  trainingCompletionRate: number;
  expertAvailabilityRate: number;
  knowledgeSharingActivity: number;
}