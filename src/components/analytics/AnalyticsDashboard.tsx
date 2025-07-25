'use client';

import { useDashboardStore } from '@/store/dashboard-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Award, AlertTriangle } from 'lucide-react';

// Professional Enterprise Theme Colors
const THEME_COLORS = {
  professionalBlue: '#2563eb',
  professionalRed: '#dc2626', 
  professionalGreen: '#22c55e',
  professionalAmber: '#f59e0b',
  navyBackground: '#0f172a',
  slateCard: '#1e293b',
  slateBorder: '#475569',
  slateMuted: '#94a3b8',
  cleanWhite: '#f8fafc'
};

const CHART_COLORS = [THEME_COLORS.professionalBlue, THEME_COLORS.professionalGreen, THEME_COLORS.professionalRed, THEME_COLORS.professionalAmber, THEME_COLORS.slateMuted];

export function AnalyticsDashboard() {
  const { 
    employees, 
    skills, 
    skillAssessments, 
    trainingPrograms,
    metrics,
    getSkillGaps
  } = useDashboardStore();

  // Calculate skill distribution data
  const skillDistribution = skills.map(skill => {
    const assessments = skillAssessments.filter(a => a.skillId === skill.id);
    const totalLevel = assessments.reduce((sum, a) => sum + a.currentLevel, 0);
    const averageLevel = assessments.length > 0 ? totalLevel / assessments.length : 0;
    
    return {
      name: skill.name,
      average: Number(averageLevel.toFixed(1)),
      required: skill.requiredLevel,
      gap: Math.max(0, skill.requiredLevel - averageLevel)
    };
  });

  // Calculate category performance
  interface CategoryAcc {
    [key: string]: {
      category: string;
      skills: typeof skills;
      totalGap: number;
      assessmentCount: number;
    };
  }
  
  const categoryPerformance = Object.values(skills.reduce((acc: CategoryAcc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = {
        category: skill.category,
        skills: [],
        totalGap: 0,
        assessmentCount: 0
      };
    }
    
    const skillAssessmentCount = skillAssessments.filter(a => a.skillId === skill.id).length;
    const skillGap = skillDistribution.find(s => s.name === skill.name)?.gap || 0;
    
    acc[skill.category].skills.push(skill);
    acc[skill.category].totalGap += skillGap;
    acc[skill.category].assessmentCount += skillAssessmentCount;
    
    return acc;
  }, {})).map((cat) => ({
    name: cat.category.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    gap: Number(cat.totalGap.toFixed(1)),
    coverage: Math.round((cat.assessmentCount / (cat.skills.length * employees.length)) * 100)
  }));

  // Training progress data
  const trainingData = trainingPrograms.map(program => ({
    name: program.name,
    completion: program.completionRate,
    enrolled: program.enrolledCount
  }));

  // Skill gaps by urgency
  const skillGaps = getSkillGaps();
  const urgentGaps = skillGaps.filter(gap => gap.gap >= 3);
  const moderateGaps = skillGaps.filter(gap => gap.gap === 2);
  const minorGaps = skillGaps.filter(gap => gap.gap === 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Superpower Attainment Framework - Analytics</h2>
        <p className="text-muted-foreground">
          Performance metrics and insights for skills development
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total Team Members</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.totalEmployees}</div>
            <p className="text-xs text-success font-medium">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Avg Skill Level</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{metrics.averageSkillLevel}</div>
            <p className="text-xs text-success font-medium">
              +0.3 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Skills Gaps</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{metrics.skillsGapCount}</div>
            <p className="text-xs text-success font-medium">
              -2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Training Completion</CardTitle>
            <Award className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{metrics.trainingCompletionRate}%</div>
            <p className="text-xs text-success font-medium">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Skills Performance Overview</CardTitle>
            <CardDescription>
              Current vs. required skill levels across all competencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={skillDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={THEME_COLORS.slateBorder} />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={10}
                  stroke={THEME_COLORS.cleanWhite}
                  interval={0}
                />
                <YAxis stroke={THEME_COLORS.cleanWhite} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: THEME_COLORS.slateCard, 
                    border: `1px solid ${THEME_COLORS.slateBorder}`,
                    borderRadius: '8px',
                    color: THEME_COLORS.cleanWhite
                  }}
                  formatter={(value: number, name: string) => [
                    `${value} / 5`,
                    name === 'average' ? 'Current Level' : 'Required Level'
                  ]}
                  labelFormatter={(label: string) => `Skill: ${label}`}
                />
                <Bar dataKey="average" fill={THEME_COLORS.professionalBlue} name="Current Level" />
                <Bar dataKey="required" fill={THEME_COLORS.professionalGreen} name="Required Level" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills Gap Distribution</CardTitle>
            <CardDescription>
              Gap severity across different skill categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Urgent (3+ levels)', value: urgentGaps.length, skills: urgentGaps.map(g => g.skill.name).slice(0, 3).join(', ') },
                    { name: 'Moderate (2 levels)', value: moderateGaps.length, skills: moderateGaps.map(g => g.skill.name).slice(0, 3).join(', ') },
                    { name: 'Minor (1 level)', value: minorGaps.length, skills: minorGaps.map(g => g.skill.name).slice(0, 3).join(', ') }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                  outerRadius={80}
                  fill={THEME_COLORS.professionalBlue}
                  dataKey="value"
                >
                  {[0, 1, 2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: THEME_COLORS.slateCard, 
                    border: `1px solid ${THEME_COLORS.slateBorder}`,
                    borderRadius: '8px',
                    color: THEME_COLORS.cleanWhite
                  }}
                  formatter={(value: number, name: string) => [
                    `${value} gaps`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>
              Skills gap analysis by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke={THEME_COLORS.slateBorder} />
                <XAxis type="number" stroke={THEME_COLORS.cleanWhite} />
                <YAxis dataKey="name" type="category" width={100} stroke={THEME_COLORS.cleanWhite} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: THEME_COLORS.slateCard, 
                    border: `1px solid ${THEME_COLORS.slateBorder}`,
                    borderRadius: '8px',
                    color: THEME_COLORS.cleanWhite
                  }} 
                />
                <Bar dataKey="gap" fill={THEME_COLORS.professionalRed} name="Average Gap" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Program Progress</CardTitle>
            <CardDescription>
              Completion rates for active training programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" stroke={THEME_COLORS.slateBorder} />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  stroke={THEME_COLORS.cleanWhite}
                />
                <YAxis stroke={THEME_COLORS.cleanWhite} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: THEME_COLORS.slateCard, 
                    border: `1px solid ${THEME_COLORS.slateBorder}`,
                    borderRadius: '8px',
                    color: THEME_COLORS.cleanWhite
                  }} 
                />
                <Bar dataKey="completion" fill={THEME_COLORS.professionalGreen} name="Completion %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Skills Gaps Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Critical Skills Gaps</CardTitle>
          <CardDescription>
            Employees with the largest skill gaps requiring immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {urgentGaps.slice(0, 10).map((gap, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {gap.employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{gap.employee.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {gap.employee.role}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{gap.skill.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Gap: {gap.gap} levels
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                    Critical
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}