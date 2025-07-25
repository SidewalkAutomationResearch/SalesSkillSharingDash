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
    available: { color: 'bg-green-100 text-green-800', text: 'Available' },
    busy: { color: 'bg-yellow-100 text-yellow-800', text: 'Busy' },
    offline: { color: 'bg-gray-100 text-gray-800', text: 'Offline' }
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
          <h2 className="text-3xl font-bold tracking-tight">Expert Network</h2>
          <p className="text-muted-foreground">
            Find and connect with subject matter experts across the organization
          </p>
        </div>
        <Button>
          <MessageCircle className="w-4 h-4 mr-2" />
          Start Group Chat
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search experts by name or role..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select.Root value={selectedCategory} onValueChange={(value: string) => setSelectedCategory(value as SkillCategory | 'all')}>
              <Select.Trigger className="inline-flex items-center justify-center rounded px-4 py-2 text-sm bg-white border hover:bg-gray-50 focus:shadow-[0_0_0_2px] focus:shadow-primary outline-none">
                <Select.Value placeholder="All Categories" />
                <Select.Icon className="ml-2" />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border">
                  <Select.Viewport className="p-1">
                    <Select.Item value="all" className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer">
                      <Select.ItemText>All Categories</Select.ItemText>
                    </Select.Item>
                    {Object.values(SkillCategory).map((category) => (
                      <Select.Item key={category} value={category} className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer">
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

      {/* Expert Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredExperts.map((expert) => {
          const expertSkills = getExpertSkills(expert.id);
          return (
            <Card key={expert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{expert.name}</CardTitle>
                      <CardDescription>{expert.role}</CardDescription>
                    </div>
                  </div>
                  <AvailabilityBadge availability={expert.availability} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Expert In:</h4>
                  <div className="flex flex-wrap gap-1">
                    {expertSkills.slice(0, 4).map((skill) => (
                      <span
                        key={skill?.id}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                      >
                        {skill?.name}
                      </span>
                    ))}
                    {expertSkills.length > 4 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                        +{expertSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Usually responds within 2 hours
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Skills-Based Expert Matching */}
      <Card>
        <CardHeader>
          <CardTitle>Find Experts by Skill</CardTitle>
          <CardDescription>
            Select a skill to find available experts who can help
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => {
              const expertsForSkill = getExpertsBySkill(skill.id);
              return (
                <div
                  key={skill.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedSkill?.id === skill.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedSkill(selectedSkill?.id === skill.id ? null : skill)}
                >
                  <div className="font-medium mb-1">{skill.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {skill.category}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-primary">
                      {expertsForSkill.length}
                    </span>
                    <span className="text-muted-foreground"> experts available</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {selectedSkill && (
            <div className="mt-6 p-4 border rounded-lg bg-muted/20">
              <h4 className="font-medium mb-3">
                Experts in {selectedSkill.name}:
              </h4>
              <div className="grid gap-3 md:grid-cols-2">
                {getExpertsBySkill(selectedSkill.id).map((expert) => (
                  <div key={expert.id} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {expert.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{expert.name}</div>
                        <div className="text-sm text-muted-foreground">{expert.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <AvailabilityBadge availability={expert.availability} />
                      <Button size="sm" variant="outline">
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
    </div>
  );
}