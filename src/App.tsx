import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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
import { RuneyTeamChat } from '@/components/chat/RuneyTeamChat';
import { RuneyQuickSearchModal } from '@/components/modals/RuneyQuickSearchModal';

export const App: React.FC = () => {
  const { currentTab, tickTimer, sidebarExpanded } = useRuneyStore();

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
      case 'quotes':
      case 'proposals':
      case 'products':
        return <RuneyInvoices />;
      case 'onboarding':
        return <RuneyOnboarding />;
      case 'analytics':
        return <RuneyAnalytics />;
      case 'chat':
        return <RuneyTeamChat />;
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
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 flex antialiased selection:bg-black selection:text-white font-sans overflow-x-hidden">
      {/* 1. Left Pitch-Black Expandable/Collapsible Floating Pill Sidebar */}
      <RuneySidebar />

      {/* 2. Top-Center Floating Action / View Pill (Fixed in viewport, does NOT scroll with page) */}
      <FloatingCenterPill />

      {/* 3. Top-Right Floating Controls (Timer, Search, Bell 4, Avatar) (Fixed in viewport) */}
      <RuneyTopNav />

      {/* 4. Main Scrollable Canvas Area */}
      <motion.main
        initial={false}
        animate={{
          marginLeft: sidebarExpanded ? 244 : 84,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="flex-1 mr-4 my-4 pt-14 min-h-[calc(100vh-2rem)] flex flex-col transition-[margin] duration-200"
      >
        {/* Dynamic View Component */}
        <div className="flex-1 transition-opacity duration-200">
          {renderView()}
        </div>
      </motion.main>

      {/* 5. Bottom Avatar Switcher Dock (Fixed in viewport) */}
      <BottomAvatarDock />

      {/* 6. Global Cmd+K Instant Action / Search Palette */}
      <RuneyQuickSearchModal />
    </div>
  );
};

export default App;
