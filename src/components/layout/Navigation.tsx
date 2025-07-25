'use client';

import { useDashboardStore } from '@/store/dashboard-store';
import { Button } from '@/components/ui/button';
import { 
  Grid3X3, 
  Users, 
  BarChart3
} from 'lucide-react';

const navigationItems = [
  {
    id: 'skills' as const,
    label: 'Skills Matrix',
    icon: Grid3X3,
    description: 'View team skill levels'
  },
  {
    id: 'experts' as const,
    label: 'Expert Network', 
    icon: Users,
    description: 'Find subject matter experts'
  },
  {
    id: 'analytics' as const,
    label: 'Analytics',
    icon: BarChart3,
    description: 'Performance insights'
  }
];

export function Navigation() {
  const { activeView, setActiveView } = useDashboardStore();

  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(item => item.id === activeView);
    return currentItem ? currentItem.label : 'Skills Matrix';
  };

  return (
    <div className="border-b border-border bg-background shadow-sm">
      <div className="container flex h-16 items-center px-4" style={{ paddingLeft: '125px' }}>
        <div className="mr-8">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            Superpower Attainment Framework
          </h1>
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

        <div className="ml-auto flex items-center">
          <h2 className="text-lg font-semibold text-foreground">
            {getCurrentPageTitle()}
          </h2>
        </div>
      </div>
    </div>
  );
}
