import { Skill, Employee, SkillAssessment, TrainingProgram, KnowledgeResource, SkillCategory, DashboardMetrics } from '@/types/skills';

export const sampleSkills: Skill[] = [
  {
    id: '1',
    name: 'Technical Demos',
    category: SkillCategory.TECHNICAL,
    description: 'Ability to conduct compelling technical demonstrations',
    requiredLevel: 4
  },
  {
    id: '2', 
    name: 'Salesforce Administration',
    category: SkillCategory.TOOLS,
    description: 'Managing and configuring Salesforce CRM',
    requiredLevel: 3
  },
  {
    id: '3',
    name: 'Solution Architecture',
    category: SkillCategory.TECHNICAL,
    description: 'Designing comprehensive technical solutions',
    requiredLevel: 4
  },
  {
    id: '4',
    name: 'Customer Discovery',
    category: SkillCategory.SALES,
    description: 'Identifying customer needs and pain points',
    requiredLevel: 5
  },
  {
    id: '5',
    name: 'API Integration',
    category: SkillCategory.TECHNICAL,
    description: 'Understanding and explaining API capabilities',
    requiredLevel: 3
  },
  {
    id: '6',
    name: 'Presentation Skills',
    category: SkillCategory.COMMUNICATION,
    description: 'Effective communication and presentation delivery',
    requiredLevel: 4
  },
  {
    id: '7',
    name: 'Cloud Architecture',
    category: SkillCategory.TECHNICAL,
    description: 'AWS, Azure, GCP solution design',
    requiredLevel: 4
  },
  {
    id: '8',
    name: 'Financial Services',
    category: SkillCategory.INDUSTRY,
    description: 'Understanding of fintech and banking solutions',
    requiredLevel: 3
  }
];

export const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    department: 'Sales Engineering',
    role: 'Senior Sales Engineer',
    isExpert: true,
    availability: 'available'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@company.com', 
    department: 'Sales Engineering',
    role: 'Sales Engineer',
    isExpert: false,
    availability: 'busy'
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@company.com',
    department: 'Sales Engineering', 
    role: 'Principal Sales Engineer',
    isExpert: true,
    availability: 'available'
  },
  {
    id: '4',
    name: 'David Park',
    email: 'david.park@company.com',
    department: 'Sales Engineering',
    role: 'Sales Engineer',
    isExpert: false,
    availability: 'offline'
  },
  {
    id: '5',
    name: 'Jennifer Wu',
    email: 'jennifer.wu@company.com',
    department: 'Sales Engineering',
    role: 'Senior Sales Engineer',
    isExpert: true,
    availability: 'available'
  },
  {
    id: '6',
    name: 'Alex Thompson',
    email: 'alex.thompson@company.com',
    department: 'Sales Engineering',
    role: 'Sales Engineer',
    isExpert: false,
    availability: 'available'
  }
];

export const sampleSkillAssessments: SkillAssessment[] = [
  { employeeId: '1', skillId: '1', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-15', assessedBy: 'manager', certifications: ['AWS Solutions Architect'] },
  { employeeId: '1', skillId: '2', currentLevel: 4, targetLevel: 4, lastAssessed: '2024-01-15', assessedBy: 'manager', certifications: ['Salesforce Admin'] },
  { employeeId: '1', skillId: '3', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-15', assessedBy: 'manager', certifications: [] },
  { employeeId: '2', skillId: '1', currentLevel: 2, targetLevel: 4, lastAssessed: '2024-01-10', assessedBy: 'manager', certifications: [] },
  { employeeId: '2', skillId: '4', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-10', assessedBy: 'manager', certifications: [] },
  { employeeId: '3', skillId: '3', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-12', assessedBy: 'manager', certifications: ['TOGAF'] },
  { employeeId: '3', skillId: '7', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-12', assessedBy: 'manager', certifications: ['AWS Solutions Architect'] },
  { employeeId: '4', skillId: '2', currentLevel: 2, targetLevel: 3, lastAssessed: '2024-01-08', assessedBy: 'manager', certifications: [] },
  { employeeId: '4', skillId: '6', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-08', assessedBy: 'manager', certifications: [] },
  { employeeId: '5', skillId: '5', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-14', assessedBy: 'manager', certifications: [] },
  { employeeId: '5', skillId: '8', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-14', assessedBy: 'manager', certifications: ['CFA Level 1'] },
  { employeeId: '6', skillId: '1', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-09', assessedBy: 'manager', certifications: [] },
  { employeeId: '6', skillId: '4', currentLevel: 2, targetLevel: 4, lastAssessed: '2024-01-09', assessedBy: 'manager', certifications: [] }
];

export const sampleTrainingPrograms: TrainingProgram[] = [
  {
    id: '1',
    name: 'Advanced Demo Techniques',
    skillIds: ['1', '6'],
    duration: 16,
    completionRate: 85,
    enrolledCount: 12,
    status: 'active'
  },
  {
    id: '2',
    name: 'Cloud Architecture Fundamentals',
    skillIds: ['7', '5'],
    duration: 24,
    completionRate: 92,
    enrolledCount: 8,
    status: 'active'
  },
  {
    id: '3',
    name: 'Financial Services Solutions',
    skillIds: ['8'],
    duration: 12,
    completionRate: 78,
    enrolledCount: 6,
    status: 'planned'
  }
];

export const sampleKnowledgeResources: KnowledgeResource[] = [
  {
    id: '1',
    title: 'Best Practices for Technical Demos',
    type: 'video',
    skillIds: ['1'],
    author: 'Sarah Chen',
    tags: ['demo', 'presentation', 'best-practices'],
    views: 147,
    rating: 4.8,
    lastUpdated: '2024-01-10'
  },
  {
    id: '2',
    title: 'API Integration Patterns',
    type: 'document',
    skillIds: ['5'],
    author: 'Jennifer Wu',
    tags: ['api', 'integration', 'technical'],
    views: 89,
    rating: 4.5,
    lastUpdated: '2024-01-08'
  },
  {
    id: '3',
    title: 'Customer Discovery Playbook',
    type: 'presentation',
    skillIds: ['4'],
    author: 'Lisa Rodriguez',
    tags: ['sales', 'discovery', 'playbook'],
    views: 203,
    rating: 4.9,
    lastUpdated: '2024-01-12'
  }
];

export const dashboardMetrics: DashboardMetrics = {
  totalEmployees: 6,
  averageSkillLevel: 3.4,
  skillsGapCount: 8,
  trainingCompletionRate: 85,
  expertAvailabilityRate: 75,
  knowledgeSharingActivity: 94
};