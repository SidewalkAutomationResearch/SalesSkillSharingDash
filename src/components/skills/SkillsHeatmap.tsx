'use client';

import { useDashboardStore } from '@/store/dashboard-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface SkillLevel {
  level: number;
  targetLevel: number;
  gap: number;
}

export function SkillsHeatmap() {
  const { 
    employees, 
    skills, 
    skillAssessments,
    selectedEmployee,
    setSelectedEmployee
  } = useDashboardStore();

  const getSkillLevel = (employeeId: string, skillId: string): SkillLevel => {
    const assessment = skillAssessments.find(
      a => a.employeeId === employeeId && a.skillId === skillId
    );
    
    if (!assessment) {
      return { level: 0, targetLevel: 0, gap: 0 };
    }
    
    return {
      level: assessment.currentLevel,
      targetLevel: assessment.targetLevel,
      gap: Math.max(0, assessment.targetLevel - assessment.currentLevel)
    };
  };

  const getSkillColor = (level: number, gap: number) => {
    if (gap > 0) {
      // Skill gap - use warning colors
      if (gap >= 2) return 'bg-red-500/20 border-red-500/30';
      return 'bg-orange-500/20 border-orange-500/30';
    }
    
    // No gap - use success colors based on level
    if (level >= 4) return 'bg-green-500/30 border-green-500/40';
    if (level >= 3) return 'bg-green-400/25 border-green-400/35';
    if (level >= 2) return 'bg-yellow-400/25 border-yellow-400/35';
    if (level >= 1) return 'bg-gray-400/20 border-gray-400/30';
    return 'bg-gray-300/10 border-gray-300/20';
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground">
            Interactive skills matrix with gap analysis visualization
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Skills Heatmap</CardTitle>
          <CardDescription>
            Color-coded skill levels with gap indicators. Darker colors indicate higher skill levels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              {/* Header Row */}
              <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(40px,1fr))] gap-1 mb-2">
                <div className="p-2 text-xs font-medium text-muted-foreground">Team Member</div>
                {skills.map((skill) => (
                  <div key={skill.id} className="p-2 text-xs text-center font-medium text-muted-foreground truncate">
                    {skill.name}
                  </div>
                ))}
              </div>

              {/* Data Rows */}
              {employees.map((employee) => (
                <div 
                  key={employee.id}
                  className={`grid grid-cols-[200px_repeat(auto-fit,minmax(40px,1fr))] gap-1 mb-1 rounded hover:bg-muted/20 cursor-pointer transition-colors ${
                    selectedEmployee?.id === employee.id ? 'bg-primary/10' : ''
                  }`}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <div className="p-2 text-sm flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium truncate">{employee.name}</div>
                      {employee.isExpert && (
                        <span className="text-xs text-accent-blue">Expert</span>
                      )}
                    </div>
                  </div>
                  
                  {skills.map((skill) => {
                    const { level, gap } = getSkillLevel(employee.id, skill.id);
                    const colorClass = getSkillColor(level, gap);
                    
                    return (
                      <motion.div
                        key={`${employee.id}-${skill.id}`}
                        className={`h-8 rounded border flex items-center justify-center text-xs font-medium ${colorClass}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {level > 0 ? level : ''}
                        {gap > 0 && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-destructive"></span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Heatmap Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border bg-green-500/30 border-green-500/40"></div>
              <span className="text-sm">High Skill (4-5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border bg-green-400/25 border-green-400/35"></div>
              <span className="text-sm">Medium Skill (3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border bg-yellow-400/25 border-yellow-400/35"></div>
              <span className="text-sm">Developing (2)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border bg-gray-400/20 border-gray-400/30"></div>
              <span className="text-sm">Low Skill (0-1)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border bg-red-500/20 border-red-500/30"></div>
              <span className="text-sm">Significant Gap</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border bg-orange-500/20 border-orange-500/30"></div>
              <span className="text-sm">Minor Gap</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
            Each cell represents an employee&apos;s skill level for a specific competency.
            Darker colors indicate higher proficiency, while red indicators highlight skills needing development.
          </p>
        </CardContent>
      </Card>
      
      {/* Bottom Info Bar */}
      <div className="bg-muted text-muted-foreground px-4 py-2 text-xs border border-border rounded-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium">
              <strong>Superpower Attainment Framework</strong> - Next.js 14 + TypeScript + Zustand + Radix UI + Recharts dashboard built for sales engineering excellence.
              Made in &lt;3 hours while the kids fell asleep.
            </span>
            <div className="flex items-center gap-3">
              <a 
                href="https://linkedin.com/in/willeddy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline font-medium"
              >
                LinkedIn
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3">
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14 21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </a>
              <a 
                href="https://willeddy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline font-medium"
              >
                willeddy.com
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3">
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14 21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
