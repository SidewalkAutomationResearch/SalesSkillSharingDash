import { create } from 'zustand';
import { Employee, Skill, SkillAssessment, TrainingProgram, KnowledgeResource, DashboardMetrics, SkillCategory } from '@/types/skills';
import { 
  sampleEmployees, 
  sampleSkills, 
  sampleSkillAssessments, 
  sampleTrainingPrograms, 
  sampleKnowledgeResources,
  dashboardMetrics 
} from '@/data/sample';

export interface SkillsFilter {
  category?: SkillCategory;
  minLevel?: number;
  maxLevel?: number;
  hasGap?: boolean;
}

interface DashboardState {
  // Data
  employees: Employee[];
  skills: Skill[];
  skillAssessments: SkillAssessment[];
  trainingPrograms: TrainingProgram[];
  knowledgeResources: KnowledgeResource[];
  metrics: DashboardMetrics;
  
  // UI State
  activeView: 'skills' | 'experts' | 'training' | 'analytics' | 'knowledge';
  selectedEmployee: Employee | null;
  selectedSkill: Skill | null;
  filters: SkillsFilter;
  
  // Actions
  setActiveView: (view: DashboardState['activeView']) => void;
  setSelectedEmployee: (employee: Employee | null) => void;
  setSelectedSkill: (skill: Skill | null) => void;
  setFilters: (filters: SkillsFilter) => void;
  updateSkillLevel: (employeeId: string, skillId: string, level: number) => void;
  getEmployeeSkills: (employeeId: string) => Array<{ skill: Skill; assessment: SkillAssessment }>;
  getSkillGaps: () => Array<{ employee: Employee; skill: Skill; gap: number }>;
  getExpertsBySkill: (skillId: string) => Employee[];
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial data
  employees: sampleEmployees,
  skills: sampleSkills,
  skillAssessments: sampleSkillAssessments,
  trainingPrograms: sampleTrainingPrograms,
  knowledgeResources: sampleKnowledgeResources,
  metrics: dashboardMetrics,
  
  // Initial UI state
  activeView: 'skills',
  selectedEmployee: null,
  selectedSkill: null,
  filters: {},
  
  // Actions
  setActiveView: (view) => set({ activeView: view }),
  
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
  
  setSelectedSkill: (skill) => set({ selectedSkill: skill }),
  
  setFilters: (filters) => set({ filters }),
  
  updateSkillLevel: (employeeId, skillId, level) => {
    const { skillAssessments } = get();
    const updatedAssessments = skillAssessments.map(assessment => 
      assessment.employeeId === employeeId && assessment.skillId === skillId
        ? { ...assessment, currentLevel: level, lastAssessed: new Date().toISOString().split('T')[0] }
        : assessment
    );
    
    // If assessment doesn't exist, create a new one
    const exists = skillAssessments.some(a => a.employeeId === employeeId && a.skillId === skillId);
    if (!exists) {
      updatedAssessments.push({
        employeeId,
        skillId,
        currentLevel: level,
        targetLevel: level,
        lastAssessed: new Date().toISOString().split('T')[0],
        assessedBy: 'self',
        certifications: []
      });
    }
    
    set({ skillAssessments: updatedAssessments });
  },
  
  getEmployeeSkills: (employeeId) => {
    const { skills, skillAssessments } = get();
    return skillAssessments
      .filter(assessment => assessment.employeeId === employeeId)
      .map(assessment => {
        const skill = skills.find(s => s.id === assessment.skillId);
        return skill ? { skill, assessment } : null;
      })
      .filter(Boolean) as Array<{ skill: Skill; assessment: SkillAssessment }>;
  },
  
  getSkillGaps: () => {
    const { employees, skills, skillAssessments } = get();
    const gaps: Array<{ employee: Employee; skill: Skill; gap: number }> = [];
    
    employees.forEach(employee => {
      skills.forEach(skill => {
        const assessment = skillAssessments.find(
          a => a.employeeId === employee.id && a.skillId === skill.id
        );
        
        if (assessment) {
          const gap = assessment.targetLevel - assessment.currentLevel;
          if (gap > 0) {
            gaps.push({ employee, skill, gap });
          }
        } else {
          // No assessment means they have no skills in this area
          gaps.push({ employee, skill, gap: skill.requiredLevel });
        }
      });
    });
    
    return gaps.sort((a, b) => b.gap - a.gap);
  },
  
  getExpertsBySkill: (skillId) => {
    const { employees, skillAssessments } = get();
    return employees.filter(employee => {
      const assessment = skillAssessments.find(
        a => a.employeeId === employee.id && a.skillId === skillId
      );
      return assessment && assessment.currentLevel >= 4; // Expert level is 4 or 5
    });
  }
}));