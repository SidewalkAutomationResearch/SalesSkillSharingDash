'use client';

import { useDashboardStore } from '@/store/dashboard-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as Progress from '@radix-ui/react-progress';
import { 
  Play, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Calendar
} from 'lucide-react';

export function TrainingDashboard() {
  const { 
    trainingPrograms, 
    employees,
    skills,
    getSkillGaps
  } = useDashboardStore();

  const skillGaps = getSkillGaps();
  const criticalGaps = skillGaps.filter(gap => gap.gap >= 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border border-success/20';
      case 'planned': return 'bg-warning/10 text-warning border border-warning/20';
      case 'completed': return 'bg-secondary text-foreground border border-border';
      default: return 'bg-secondary text-foreground border border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'planned': return <Calendar className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Superpower Attainment Framework - Training</h2>
          <p className="text-muted-foreground">
            Manage learning programs and track skill development progress
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Training
          </Button>
          <Button variant="deep-green">
            <Plus className="w-4 h-4 mr-2" />
            Create Program
          </Button>
        </div>
      </div>

      {/* Training Programs Overview */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {trainingPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{program.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {program.duration} hours • {program.skillIds.length} skills covered
                  </CardDescription>
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(program.status)}`}>
                  {getStatusIcon(program.status)}
                  <span className="ml-1 capitalize">{program.status}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{program.completionRate}%</span>
                </div>
                <Progress.Root className="relative overflow-hidden bg-secondary rounded-full w-full h-2">
                  <Progress.Indicator
                    className="bg-success h-full w-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                    style={{ transform: `translateX(-${100 - program.completionRate}%)` }}
                  />
                </Progress.Root>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{program.enrolledCount} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{program.duration}h total</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-sm">Skills Covered:</h4>
                <div className="flex flex-wrap gap-1">
                  {program.skillIds.slice(0, 3).map((skillId) => {
                    const skill = skills.find(s => s.id === skillId);
                    return skill ? (
                      <span
                        key={skill.id}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted"
                      >
                        {skill.name}
                      </span>
                    ) : null;
                  })}
                  {program.skillIds.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                      +{program.skillIds.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  {program.status === 'active' ? 'Continue' : 'Start'}
                </Button>
                <Button size="sm" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommended Training Based on Skill Gaps */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Training Programs</CardTitle>
          <CardDescription>
            Based on current skill gaps and team development needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {criticalGaps.slice(0, 5).map((gap, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50 border-orange-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {gap.skill.name} Training for {gap.employee.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current gap: {gap.gap} levels • Priority: High
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Est. 12 hours
                  </span>
                  <Button size="sm">
                    Create Program
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Calendar/Schedule */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>
              Scheduled training sessions for this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Advanced Demo Techniques</div>
                  <div className="text-sm text-muted-foreground">
                    Today, 2:00 PM - 4:00 PM
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                    Live
                  </span>
                  <Button size="sm" variant="outline">
                    Join
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Cloud Architecture Deep Dive</div>
                  <div className="text-sm text-muted-foreground">
                    Tomorrow, 10:00 AM - 12:00 PM
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    Scheduled  
                  </span>
                  <Button size="sm" variant="outline">
                    Register
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Customer Discovery Workshop</div>
                  <div className="text-sm text-muted-foreground">
                    Friday, 1:00 PM - 5:00 PM
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    Scheduled
                  </span>
                  <Button size="sm" variant="outline">
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Metrics</CardTitle>
            <CardDescription>
              Key performance indicators for learning programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Completion Rate</span>
                <span className="text-lg font-bold text-green-600">85%</span>
              </div>
              <Progress.Root className="relative overflow-hidden bg-secondary rounded-full w-full h-2">
                <Progress.Indicator
                  className="bg-green-500 h-full w-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                  style={{ transform: `translateX(-15%)` }}
                />
              </Progress.Root>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-medium">Average Time to Complete</span>
                <span className="text-lg font-bold">18 hours</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Satisfaction Score</span>
                <span className="text-lg font-bold text-blue-600">4.7/5</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Learners</span>
                <span className="text-lg font-bold">{employees.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}