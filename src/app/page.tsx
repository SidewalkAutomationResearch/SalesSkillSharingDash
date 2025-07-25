'use client';

import { useDashboardStore } from '@/store/dashboard-store';
import { Navigation } from '@/components/layout/Navigation';
import { SkillsMatrix } from '@/components/skills/SkillsMatrix';
import { ExpertNetwork } from '@/components/experts/ExpertNetwork';
import { TrainingDashboard } from '@/components/training/TrainingDashboard';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { KnowledgeBase } from '@/components/knowledge/KnowledgeBase';

export default function Home() {
  const { activeView } = useDashboardStore();

  const renderActiveView = () => {
    switch (activeView) {
      case 'skills':
        return <SkillsMatrix />;
      case 'experts':
        return <ExpertNetwork />;
      case 'training':
        return <TrainingDashboard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'knowledge':
        return <KnowledgeBase />;
      default:
        return <SkillsMatrix />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {renderActiveView()}
      </main>
    </div>
  );
}
