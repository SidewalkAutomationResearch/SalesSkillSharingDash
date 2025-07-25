'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboard-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, MessageCircle, Calendar, User, Clock } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import { SkillCategory } from '@/types/skills';

const AvailabilityBadge = ({ availability }: { availability: string }) => {
  const config = {
    available: { color: 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20', text: 'Available' },
    busy: { color: 'bg-warning/10 text-warning border border-warning/20', text: 'Busy' },
    offline: { color: 'bg-muted text-muted-foreground border border-border', text: 'Offline' }
  };
  
  const { color, text } = config[availability as keyof typeof config] || config.offline;
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${color}`}>
      <div className="w-2 h-2 rounded-full bg-current mr-1" />
      {text}
    </span>
  );
};

export function ExpertNetwork() {
  const { 
    employees, 
    skills, 
    skillAssessments,
    selectedSkill,
    setSelectedSkill,
    getExpertsBySkill
  } = useDashboardStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');

  const experts = employees.filter(emp => emp.isExpert);
  
  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (selectedCategory === 'all') return true;
    
    // Check if expert has skills in the selected category
    const expertSkills = skillAssessments
      .filter(a => a.employeeId === expert.id && a.currentLevel >= 4)
      .map(a => skills.find(s => s.id === a.skillId))
      .filter(Boolean);
    
    return expertSkills.some(skill => skill?.category === selectedCategory);
  });

  const getExpertSkills = (expertId: string) => {
    return skillAssessments
      .filter(a => a.employeeId === expertId && a.currentLevel >= 4)
      .map(a => skills.find(s => s.id === a.skillId))
      .filter(Boolean);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Superpower Attainment Framework - Expert Network</h2>
          <p className="text-muted-foreground">
            Find and connect with subject matter experts across the organization
          </p>
        </div>
        <Button variant="destructive" className="h-8 px-3 py-1.5 text-sm">
          <MessageCircle className="w-3 h-3 mr-1" />
          Start Group Chat
        </Button>
      </div>

      {/* Skills-Based Expert Matching - Moved to Top */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Find Experts by Skill</CardTitle>
          <CardDescription className="text-xs">
            Select a skill to find available experts who can help
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill) => {
              const expertsForSkill = getExpertsBySkill(skill.id);
              return (
                <div
                  key={skill.id}
                  className={`p-3 border rounded cursor-pointer transition-colors hover:bg-muted/50 text-xs ${
                    selectedSkill?.id === skill.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border bg-card hover:bg-muted/30'
                  }`}
                  onClick={() => setSelectedSkill(selectedSkill?.id === skill.id ? null : skill)}
                >
                  <div className="font-medium mb-1">{skill.name}</div>
                  <div className="text-muted-foreground mb-1">
                    {skill.category}
                  </div>
                  <div>
                    <span className="font-medium text-primary">
                      {expertsForSkill.length}
                    </span>
                    <span className="text-muted-foreground"> experts</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {selectedSkill && (
            <div className="mt-4 p-3 border rounded-lg bg-card border-border">
              <h4 className="font-medium mb-2 text-sm">
                Experts in {selectedSkill.name}:
              </h4>
              <div className="grid gap-2 md:grid-cols-2">
                {getExpertsBySkill(selectedSkill.id).map((expert) => (
                  <div key={expert.id} className="flex items-center justify-between p-2 bg-card rounded border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                        {expert.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{expert.name}</div>
                        <div className="text-xs text-muted-foreground">{expert.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <AvailabilityBadge availability={expert.availability} />
                      <Button variant="outline" className="h-6 px-2 text-xs">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search and Filters - Moved to Top */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search experts by name or role..."
                className="w-full pl-7 pr-3 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select.Root value={selectedCategory} onValueChange={(value: string) => setSelectedCategory(value as SkillCategory | 'all')}>
              <Select.Trigger className="inline-flex items-center justify-center rounded px-3 py-1.5 text-xs bg-card border-border border hover:bg-muted focus:shadow-[0_0_0_1px] focus:shadow-primary outline-none text-card-foreground">
                <Select.Value placeholder="All Categories" />
                <Select.Icon className="ml-1" />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-popover rounded-md shadow-lg border-border border text-popover-foreground text-xs">
                  <Select.Viewport className="p-1">
                    <Select.Item value="all" className="relative flex items-center px-6 py-1.5 rounded hover:bg-muted cursor-pointer">
                      <Select.ItemText>All Categories</Select.ItemText>
                    </Select.Item>
                    {Object.values(SkillCategory).map((category) => (
                      <Select.Item key={category} value={category} className="relative flex items-center px-6 py-1.5 rounded hover:bg-muted cursor-pointer">
                        <Select.ItemText className="capitalize">{category}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </CardContent>
      </Card>

      {/* Expert Grid - Reduced Size and Moved to Bottom */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filteredExperts.map((expert) => {
          const expertSkills = getExpertSkills(expert.id);
          return (
            <Card key={expert.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{expert.name}</CardTitle>
                      <CardDescription className="text-xs">{expert.role}</CardDescription>
                    </div>
                  </div>
                  <AvailabilityBadge availability={expert.availability} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2 py-2">
                <div>
                  <h4 className="font-medium text-xs mb-1">Expert In:</h4>
                  <div className="flex flex-wrap gap-1">
                    {expertSkills.slice(0, 3).map((skill) => (
                      <span
                        key={skill?.id}
                        className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-primary/10 text-primary"
                      >
                        {skill?.name}
                      </span>
                    ))}
                    {expertSkills.length > 3 && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                        +{expertSkills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button className="flex-1 h-6 px-2 text-xs">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Message
                  </Button>
                  <Button variant="outline" className="flex-1 h-6 px-2 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    Schedule
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="w-2.5 h-2.5 mr-1" />
                  Usually responds within 2 hours
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
