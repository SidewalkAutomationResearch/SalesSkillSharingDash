'use client';

import { useDashboardStore } from '@/store/dashboard-store';
import { TopBanner } from '@/components/layout/TopBanner';
import { Navigation } from '@/components/layout/Navigation';
import { SkillsHeatmap } from '@/components/skills/SkillsHeatmap';
import { ExpertNetwork } from '@/components/experts/ExpertNetwork';
import { TrainingDashboard } from '@/components/training/TrainingDashboard';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { KnowledgeBase } from '@/components/knowledge/KnowledgeBase';

export default function Home() {
  const { activeView } = useDashboardStore();

  const renderActiveView = () => {
    switch (activeView) {
      case 'skills':
        return <SkillsHeatmap />;
      case 'experts':
        return <ExpertNetwork />;
      case 'training':
        return <TrainingDashboard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'knowledge':
        return <KnowledgeBase />;
      default:
        return <SkillsHeatmap />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navigation />
      <main className="container mx-auto px-4 py-8 bg-background">
        <div className="space-y-6">
          {renderActiveView()}
        </div>
      </main>
    </div>
  );
}
