import React, { useEffect } from 'react';
import { useRuneyStore } from '@/store/useRuneyStore';
import { RuneySidebar } from '@/components/layout/RuneySidebar';
import { RuneyTopNav } from '@/components/layout/RuneyTopNav';
import { FloatingCenterPill } from '@/components/layout/FloatingCenterPill';
import { BottomAvatarDock } from '@/components/layout/BottomAvatarDock';
import { RuneyDashboard } from '@/components/dashboard/RuneyDashboard';
import { RuneyKanban } from '@/components/kanban/RuneyKanban';
import { RuneyClients } from '@/components/clients/RuneyClients';
import { RuneyExpenses } from '@/components/expenses/RuneyExpenses';
import { RuneyInvoices } from '@/components/invoices/RuneyInvoices';
import { RuneyOnboarding } from '@/components/onboarding/RuneyOnboarding';
import { RuneySettings } from '@/components/settings/RuneySettings';
import { RuneyProjects } from '@/components/projects/RuneyProjects';
import { RuneyAnalytics } from '@/components/analytics/RuneyAnalytics';
import { RuneyAIStudio } from '@/components/ai/RuneyAIStudio';
import { RuneyQuickSearchModal } from '@/components/modals/RuneyQuickSearchModal';

export const App: React.FC = () => {
  const { currentTab, tickTimer } = useRuneyStore();

  // Ambient timer tick
  useEffect(() => {
    const timerInterval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [tickTimer]);

  const renderView = () => {
    switch (currentTab) {
      case 'dashboard':
        return <RuneyDashboard />;
      case 'tasks':
        return <RuneyKanban />;
      case 'projects':
        return <RuneyProjects />;
      case 'clients':
        return <RuneyClients />;
      case 'expenses':
        return <RuneyExpenses />;
      case 'invoices':
        return <RuneyInvoices />;
      case 'onboarding':
        return <RuneyOnboarding />;
      case 'analytics':
        return <RuneyAnalytics />;
      case 'ai':
        return <RuneyAIStudio />;
      case 'settings':
      case 'integrations':
        return <RuneySettings />;
      default:
        return <RuneyDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 flex antialiased selection:bg-black selection:text-white font-sans">
      {/* 1. Left Pitch-Black Floating Pill Sidebar */}
      <RuneySidebar />

      {/* 2. Main Canvas Area */}
      <main className="flex-1 ml-[80px] mr-4 my-4 min-h-[calc(100vh-2rem)] flex flex-col">
        {/* Top Header & Floating Center Switcher Pill */}
        <div className="w-full">
          <RuneyTopNav />
          <FloatingCenterPill />
        </div>

        {/* Dynamic View Component */}
        <div className="flex-1 transition-opacity duration-200">
          {renderView()}
        </div>
      </main>

      {/* 3. Bottom Avatar Switcher Dock */}
      <BottomAvatarDock />

      {/* 4. Global Cmd+K Instant Action / Search Palette */}
      <RuneyQuickSearchModal />
    </div>
  );
};

export default App;
