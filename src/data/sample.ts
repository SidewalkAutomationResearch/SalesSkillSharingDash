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
    name: 'HR / AI Tech',
    category: SkillCategory.INDUSTRY,
    description: 'Understanding of HR technology and AI solutions',
    requiredLevel: 3
  }
];

export const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'Bradd Pitt',
    email: 'bradd.pitt@company.com',
    department: 'Sales Engineering',
    role: 'Senior Sales Engineer',
    isExpert: true,
    availability: 'available'
  },
  {
    id: '15',
    name: 'Will Eddy',
    email: 'will.eddy@company.com',
    department: 'Sales Engineering',
    role: 'Sales Engineer',
    isExpert: true,
    availability: 'available'
  },
  {
    id: '2',
    name: 'Leonardo DiCaprio',
    email: 'leonardo.dicaprio@company.com', 
    department: 'Sales Engineering',
    role: 'Sales Engineer',
    isExpert: false,
    availability: 'busy'
  },
  {
    id: '3',
    name: 'Jennyfer Lawrence',
    email: 'jennyfer.lawrence@company.com',
    department: 'Sales Engineering', 
    role: 'Principal Sales Engineer',
    isExpert: true,
    availability: 'available'
  },
  {
    id: '4',
    name: 'Chriss Hemsworth',
    email: 'chriss.hemsworth@company.com',
    department: 'Sales Engineering',
    role: 'Sales Engineer',
    isExpert: false,
    availability: 'offline'
  },
  {
    id: '5',
    name: 'Scarlett Johanson',
    email: 'scarlett.johanson@company.com',
    department: 'Sales Engineering',
    role: 'Senior Sales Engineer',
    isExpert: true,
    availability: 'available'
  },
  {
    id: '6',
    name: 'Dwayne Johnson',
    email: 'dwayne.johnson@company.com',
    department: 'Sales Engineering',
    role: 'Sales Engineer',
    isExpert: false,
    availability: 'available'
  },
  {
    id: '7',
    name: 'Emma Stone',
    email: 'emma.stone@company.com',
    department: 'Sales Engineering',
    role: 'Senior Sales Engineer',
    isExpert: true,
    availability: 'available'
  },
  {
    id: '8',
    name: 'Ryan Renolds',
    email: 'ryan.renolds@company.com',
    department: 'Sales Engineering',
    role: 'Sales Engineer',
    isExpert: false,
    availability: 'busy'
  },
  {
    id: '9',
    name: 'Gal Gadot',
    email: 'gal.gadot@company.com',
    department: 'Sales Engineering',
    role: 'Principal Sales Engineer',
    isExpert: true,
    availability: 'available'
  },
  {
    id: '10',
    name: 'Will Smith',
    email: 'will.smith@company.com',
    department: 'Sales Engineering',
    role: 'Sales Engineer',
    isExpert: false,
    availability: 'available'
  },
  {
    id: '11',
    name: 'Charlize Theron',
    email: 'charlize.theron@company.com',
    department: 'Sales Engineering',
    role: 'Senior Sales Engineer',
    isExpert: true,
    availability: 'offline'
  },
  {
    id: '12',
    name: 'Tom Hanks',
    email: 'tom.hanks@company.com',
    department: 'Sales Engineering',
    role: 'Sales Engineer',
    isExpert: false,
    availability: 'busy'
  },
  {
    id: '13',
    name: 'Meryl Streep',
    email: 'meryl.streep@company.com',
    department: 'Sales Engineering',
    role: 'Senior Sales Engineer',
    isExpert: true,
    availability: 'available'
  },
  {
    id: '14',
    name: 'Robert Downey',
    email: 'robert.downey@company.com',
    department: 'Sales Engineering',
    role: 'Principal Sales Engineer',
    isExpert: true,
    availability: 'available'
  }
];

export const sampleSkillAssessments: SkillAssessment[] = [
  // Bradd Pitt - Expert
  { employeeId: '1', skillId: '1', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-15', assessedBy: 'manager', certifications: ['AWS Solutions Architect'] },
  { employeeId: '1', skillId: '2', currentLevel: 4, targetLevel: 4, lastAssessed: '2024-01-15', assessedBy: 'manager', certifications: ['Salesforce Admin'] },
  { employeeId: '1', skillId: '3', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-15', assessedBy: 'manager', certifications: [] },
  { employeeId: '1', skillId: '6', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-15', assessedBy: 'manager', certifications: [] },
  { employeeId: '1', skillId: '7', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-15', assessedBy: 'manager', certifications: [] },
  
  // Leonardo DiCaprio
  { employeeId: '2', skillId: '1', currentLevel: 2, targetLevel: 4, lastAssessed: '2024-01-10', assessedBy: 'manager', certifications: [] },
  { employeeId: '2', skillId: '4', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-10', assessedBy: 'manager', certifications: [] },
  { employeeId: '2', skillId: '6', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-10', assessedBy: 'manager', certifications: [] },
  
  // Jennyfer Lawrence - Expert
  { employeeId: '3', skillId: '3', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-12', assessedBy: 'manager', certifications: ['TOGAF'] },
  { employeeId: '3', skillId: '7', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-12', assessedBy: 'manager', certifications: ['AWS Solutions Architect'] },
  { employeeId: '3', skillId: '1', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-12', assessedBy: 'manager', certifications: [] },
  { employeeId: '3', skillId: '8', currentLevel: 2, targetLevel: 3, lastAssessed: '2024-01-12', assessedBy: 'manager', certifications: [] },
  
  // Chriss Hemsworth
  { employeeId: '4', skillId: '2', currentLevel: 2, targetLevel: 3, lastAssessed: '2024-01-08', assessedBy: 'manager', certifications: [] },
  { employeeId: '4', skillId: '6', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-08', assessedBy: 'manager', certifications: [] },
  { employeeId: '4', skillId: '5', currentLevel: 1, targetLevel: 3, lastAssessed: '2024-01-08', assessedBy: 'manager', certifications: [] },
  
  // Scarlett Johanson - Expert
  { employeeId: '5', skillId: '5', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-14', assessedBy: 'manager', certifications: [] },
  { employeeId: '5', skillId: '8', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-14', assessedBy: 'manager', certifications: ['CFA Level 1'] },
  { employeeId: '5', skillId: '4', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-14', assessedBy: 'manager', certifications: [] },
  
  // Dwayne Johnson
  { employeeId: '6', skillId: '1', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-09', assessedBy: 'manager', certifications: [] },
  { employeeId: '6', skillId: '4', currentLevel: 2, targetLevel: 4, lastAssessed: '2024-01-09', assessedBy: 'manager', certifications: [] },
  { employeeId: '6', skillId: '7', currentLevel: 2, targetLevel: 3, lastAssessed: '2024-01-09', assessedBy: 'manager', certifications: [] },
  
  // Emma Stone - Expert
  { employeeId: '7', skillId: '3', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-16', assessedBy: 'manager', certifications: ['TOGAF'] },
  { employeeId: '7', skillId: '6', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-16', assessedBy: 'manager', certifications: [] },
  { employeeId: '7', skillId: '2', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-16', assessedBy: 'manager', certifications: [] },
  
  // Ryan Renolds
  { employeeId: '8', skillId: '2', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-11', assessedBy: 'manager', certifications: [] },
  { employeeId: '8', skillId: '5', currentLevel: 2, targetLevel: 3, lastAssessed: '2024-01-11', assessedBy: 'manager', certifications: [] },
  { employeeId: '8', skillId: '1', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-11', assessedBy: 'manager', certifications: [] },
  
  // Gal Gadot - Expert
  { employeeId: '9', skillId: '7', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-17', assessedBy: 'manager', certifications: ['AWS Solutions Architect', 'Azure Architect'] },
  { employeeId: '9', skillId: '8', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-17', assessedBy: 'manager', certifications: ['CFA Level 2'] },
  { employeeId: '9', skillId: '3', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-17', assessedBy: 'manager', certifications: [] },
  
  // Will Smith
  { employeeId: '10', skillId: '1', currentLevel: 2, targetLevel: 3, lastAssessed: '2024-01-13', assessedBy: 'manager', certifications: [] },
  { employeeId: '10', skillId: '6', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-13', assessedBy: 'manager', certifications: [] },
  { employeeId: '10', skillId: '4', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-13', assessedBy: 'manager', certifications: [] },
  
  // Charlize Theron - Expert
  { employeeId: '11', skillId: '5', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-18', assessedBy: 'manager', certifications: [] },
  { employeeId: '11', skillId: '8', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-18', assessedBy: 'manager', certifications: ['CFA Level 3'] },
  { employeeId: '11', skillId: '2', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-18', assessedBy: 'manager', certifications: [] },
  
  // Tom Hanks
  { employeeId: '12', skillId: '6', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-19', assessedBy: 'manager', certifications: [] },
  { employeeId: '12', skillId: '3', currentLevel: 2, targetLevel: 4, lastAssessed: '2024-01-19', assessedBy: 'manager', certifications: [] },
  { employeeId: '12', skillId: '1', currentLevel: 3, targetLevel: 4, lastAssessed: '2024-01-19', assessedBy: 'manager', certifications: [] },
  
  // Meryl Streep - Expert
  { employeeId: '13', skillId: '4', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-20', assessedBy: 'manager', certifications: [] },
  { employeeId: '13', skillId: '6', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-20', assessedBy: 'manager', certifications: [] },
  { employeeId: '13', skillId: '2', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-20', assessedBy: 'manager', certifications: [] },
  
  // Robert Downey - Expert
  { employeeId: '14', skillId: '7', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-21', assessedBy: 'manager', certifications: ['AWS Solutions Architect', 'GCP Professional'] },
  { employeeId: '14', skillId: '3', currentLevel: 5, targetLevel: 5, lastAssessed: '2024-01-21', assessedBy: 'manager', certifications: ['TOGAF'] },
  { employeeId: '14', skillId: '1', currentLevel: 4, targetLevel: 5, lastAssessed: '2024-01-21', assessedBy: 'manager', certifications: [] },
  
  // Will Eddy
  { employeeId: '15', skillId: '1', currentLevel: 4, targetLevel: 4, lastAssessed: '2024-01-22', assessedBy: 'manager', certifications: [] }, // Technical Demos
  { employeeId: '15', skillId: '2', currentLevel: 2, targetLevel: 2, lastAssessed: '2024-01-22', assessedBy: 'manager', certifications: [] }, // Salesforce Administration
  { employeeId: '15', skillId: '3', currentLevel: 3, targetLevel: 3, lastAssessed: '2024-01-22', assessedBy: 'manager', certifications: [] }, // Solution Architecture
  { employeeId: '15', skillId: '4', currentLevel: 4, targetLevel: 4, lastAssessed: '2024-01-22', assessedBy: 'manager', certifications: [] }, // Customer Discovery
  { employeeId: '15', skillId: '5', currentLevel: 4, targetLevel: 4, lastAssessed: '2024-01-22', assessedBy: 'manager', certifications: [] }, // API Integration
  { employeeId: '15', skillId: '6', currentLevel: 4, targetLevel: 4, lastAssessed: '2024-01-22', assessedBy: 'manager', certifications: [] }, // Presentation Skills
  { employeeId: '15', skillId: '7', currentLevel: 3, targetLevel: 3, lastAssessed: '2024-01-22', assessedBy: 'manager', certifications: [] }, // Cloud Architecture
  { employeeId: '15', skillId: '8', currentLevel: 4, targetLevel: 4, lastAssessed: '2024-01-22', assessedBy: 'manager', certifications: [] } // HR / AI Tech
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
    name: 'HR / AI Tech Solutions',
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
  totalEmployees: 14,
  averageSkillLevel: 3.4,
  skillsGapCount: 18,
  trainingCompletionRate: 82,
  expertAvailabilityRate: 75,
  knowledgeSharingActivity: 89
};
