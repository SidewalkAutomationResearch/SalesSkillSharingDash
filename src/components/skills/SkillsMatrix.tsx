'use client';

import { useDashboardStore } from '@/store/dashboard-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as Progress from '@radix-ui/react-progress';

const SkillLevelIndicator = ({ level, targetLevel }: { level: number; targetLevel: number }) => {
  const getColor = (currentLevel: number) => {
    if (currentLevel >= 4) return 'bg-success'; // Emerald Green for high skill
    if (currentLevel >= 3) return 'bg-warning'; // Golden Yellow for medium skill
    if (currentLevel >= 2) return 'bg-warning/70'; // Lighter yellow for developing skill
    return 'bg-destructive'; // Red for low skill
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full border border-border ${
              i <= level ? getColor(level) : 'bg-secondary'
            }`}
          />
        ))}
      </div>
      {targetLevel > level && (
        <span className="text-xs text-muted-foreground">
          Target: {targetLevel}
        </span>
      )}
    </div>
  );
};

export function SkillsMatrix() {
  const { 
    employees, 
    skills, 
    skillAssessments, 
    selectedEmployee,
    setSelectedEmployee,
    getEmployeeSkills
  } = useDashboardStore();

  const getSkillLevel = (employeeId: string, skillId: string) => {
    const assessment = skillAssessments.find(
      a => a.employeeId === employeeId && a.skillId === skillId
    );
    return assessment ? assessment.currentLevel : 0;
  };

  const getTargetLevel = (employeeId: string, skillId: string) => {
    const assessment = skillAssessments.find(
      a => a.employeeId === employeeId && a.skillId === skillId
    );
    return assessment ? assessment.targetLevel : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Skills Matrix</h2>
          <p className="text-muted-foreground">
            View and manage team skill levels across all competencies
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button variant="deep-green">Add Assessment</Button>
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Team Skills Overview</CardTitle>
          <CardDescription>
            Current skill levels vs. target levels for all team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Team Member</th>
                  {skills.map((skill) => (
                    <th
                      key={skill.id}
                      className="text-left p-4 font-medium min-w-[150px]"
                    >
                      <div>
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {skill.category}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr
                    key={employee.id}
                    className={`border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${
                      index % 2 === 0 ? 'bg-background' : 'bg-card/30'
                    }`}
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {employee.role}
                          </div>
                        </div>
                        {employee.isExpert && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            Expert
                          </span>
                        )}
                      </div>
                    </td>
                    {skills.map((skill) => (
                      <td key={skill.id} className="p-4">
                        <SkillLevelIndicator
                          level={getSkillLevel(employee.id, skill.id)}
                          targetLevel={getTargetLevel(employee.id, skill.id)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Selected Employee Detail */}
      {selectedEmployee && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedEmployee.name} - Skill Details</CardTitle>
            <CardDescription>
              Detailed view of skill assessments and progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {getEmployeeSkills(selectedEmployee.id).map(({ skill, assessment }) => (
                <div
                  key={skill.id}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-muted rounded">
                      {skill.category}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Level</span>
                      <span className="font-medium">{assessment.currentLevel}/5</span>
                    </div>
                    <Progress.Root className="relative overflow-hidden bg-secondary rounded-full w-full h-2">
                      <Progress.Indicator
                        className="bg-primary h-full w-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                        style={{ transform: `translateX(-${100 - (assessment.currentLevel * 20)}%)` }}
                      />
                    </Progress.Root>
                    {assessment.targetLevel > assessment.currentLevel && (
                      <div className="text-xs text-muted-foreground">
                        Gap: {assessment.targetLevel - assessment.currentLevel} levels to target
                      </div>
                    )}
                  </div>
                  
                  {assessment.certifications.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {assessment.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground">
                    Last assessed: {assessment.lastAssessed} by {assessment.assessedBy}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}