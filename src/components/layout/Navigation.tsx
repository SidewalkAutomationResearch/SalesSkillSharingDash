'use client';

import { useDashboardStore } from '@/store/dashboard-store';
import { Button } from '@/components/ui/button';
import { 
  Grid3X3, 
  Users, 
  BarChart3, 
  Settings,
  Search
} from 'lucide-react';

const navigationItems = [
  {
    id: 'analytics' as const,
    label: 'Analytics',
    icon: BarChart3,
    description: 'Performance insights'
  },
  {
    id: 'experts' as const,
    label: 'Expert Network', 
    icon: Users,
    description: 'Find subject matter experts'
  },
  {
    id: 'skills' as const,
    label: 'Skills Matrix',
    icon: Grid3X3,
    description: 'View team skill levels'
  }
];

export function Navigation() {
  const { activeView, setActiveView } = useDashboardStore();

  return (
    <div className="border-b border-border bg-background shadow-sm">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-8">
          <h1 className="text-xl font-bold text-foreground">Superpower Attainment Framework</h1>
          <p className="text-xs text-muted-foreground">Sales Engineering Skills Dashboard</p>
        </div>
        
        <nav className="flex items-center space-x-2 lg:space-x-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveView(item.id)}
                className="relative"
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}