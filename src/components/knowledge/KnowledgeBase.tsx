'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboard-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  Video, 
  Presentation, 
  Star, 
  Eye, 
  Download,
  Plus,
  Filter,
  TrendingUp
} from 'lucide-react';

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'video': return <Video className="w-4 h-4" />;
    case 'presentation': return <Presentation className="w-4 h-4" />;
    case 'document': return <FileText className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

const getResourceColor = (type: string) => {
  switch (type) {
    case 'video': return 'bg-red-100 text-red-800';
    case 'presentation': return 'bg-blue-100 text-blue-800';
    case 'document': return 'bg-green-100 text-green-800';
    case 'best-practice': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function KnowledgeBase() {
  const { 
    knowledgeResources, 
    skills
  } = useDashboardStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredResources = knowledgeResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;
    
    if (selectedType === 'all') return true;
    
    return resource.type === selectedType;
  });

  const trendingResources = knowledgeResources
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  const recentlyUpdated = knowledgeResources
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Knowledge Base</h2>
          <p className="text-muted-foreground">
            Centralized repository of best practices, guides, and learning resources
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources, authors, or tags..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'video', 'document', 'presentation', 'best-practice'].map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="capitalize"
                >
                  {type === 'all' ? 'All' : type.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Content - Resources Grid */}
        <div className="lg:col-span-3">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${getResourceColor(resource.type)}`}>
                        {getResourceIcon(resource.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                        <CardDescription className="mt-1">
                          by {resource.author}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {resource.views} views
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {resource.rating}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Related Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {resource.skillIds.slice(0, 3).map((skillId) => {
                        const skill = skills.find(s => s.id === skillId);
                        return skill ? (
                          <Badge key={skill.id} variant="secondary" className="text-xs">
                            {skill.name}
                          </Badge>
                        ) : null;
                      })}
                      {resource.skillIds.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.skillIds.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Tags:</h4>
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Updated: {new Date(resource.lastUpdated).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending
              </CardTitle>
              <CardDescription>
                Most viewed resources this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingResources.map((resource, index) => (
                  <div key={resource.id} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm leading-tight">
                        {resource.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {resource.views} views
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recently Updated */}
          <Card>
            <CardHeader>
              <CardTitle>Recently Updated</CardTitle>
              <CardDescription>
                Latest content additions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentlyUpdated.map((resource) => (
                  <div key={resource.id} className="flex items-start gap-3">
                    <div className={`p-1.5 rounded ${getResourceColor(resource.type)} flex-shrink-0`}>
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm leading-tight">
                        {resource.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(resource.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Resources</span>
                  <span className="font-medium">{knowledgeResources.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Video Content</span>
                  <span className="font-medium">
                    {knowledgeResources.filter(r => r.type === 'video').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Documents</span>
                  <span className="font-medium">
                    {knowledgeResources.filter(r => r.type === 'document').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Best Practices</span>
                  <span className="font-medium">
                    {knowledgeResources.filter(r => r.type === 'best-practice').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}