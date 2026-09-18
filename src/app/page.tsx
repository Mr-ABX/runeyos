'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRuneyStore } from '@/lib/store';
import { FloatingPillSidebar } from '@/components/navigation/FloatingPillSidebar';
import { LiquidCalendarBar } from '@/components/navigation/LiquidCalendarBar';
import { AmbientTimerDock } from '@/components/time-tracker/AmbientTimerDock';
import { ToastNotification } from '@/components/ui/ToastNotification';

// Views
import { DashboardView } from '@/components/dashboard/DashboardView';
import { ProjectsView } from '@/components/projects/ProjectsView';
import { KanbanBoardView } from '@/components/kanban/KanbanBoardView';
import { TimeTrackingView } from '@/components/time-tracker/TimeTrackingView';
import { ClientsView } from '@/components/clients/ClientsView';
import { InvoicesView } from '@/components/invoices/InvoicesView';
import { ClientPortalView } from '@/components/portal/ClientPortalView';
import { AIStudioView } from '@/components/ai/AIStudioView';
import { SettingsView } from '@/components/settings/SettingsView';

export default function Home() {
  const { activeTab, sidebarCollapsed } = useRuneyStore();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'projects':
        return <ProjectsView />;
      case 'tasks':
        return <KanbanBoardView />;
      case 'time':
        return <TimeTrackingView />;
      case 'clients':
        return <ClientsView />;
      case 'invoices':
        return <InvoicesView />;
      case 'portal':
        return <ClientPortalView />;
      case 'ai':
        return <AIStudioView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <main className="min-h-screen flex bg-[#09090b] text-zinc-100 relative">
      {/* Floating Pill Navigation Sidebar */}
      <FloatingPillSidebar />

      {/* Main Content Viewport */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          sidebarCollapsed ? 'pl-24' : 'pl-24 md:pl-72'
        } pr-4 sm:pr-8 py-4`}
      >
        {/* Top Horizontal Liquid Glass Calendar Bar */}
        <header className="mb-6 sticky top-4 z-30">
          <LiquidCalendarBar />
        </header>

        {/* Dynamic Tab Body */}
        <section className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      {/* Floating Ambient Time Tracker Dock */}
      <AmbientTimerDock />

      {/* Ambient Toast Feedback Popup */}
      <ToastNotification />
    </main>
  );
}
