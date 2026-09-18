import React from 'react';
import {
  LayoutGrid,
  Users,
  Folder,
  ListTodo,
  FileText,
  Wallet,
  LogIn,
  Box,
  BarChart3,
  Settings,
  HelpCircle,
  Hexagon,
  Plus,
  Sparkles,
} from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';
import { RuneyTab } from '@/types';

interface SidebarItem {
  id: RuneyTab;
  label: string;
  icon: React.ElementType;
}

const mainNavItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'clients', label: 'Clients & CRM', icon: Users },
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'tasks', label: 'Tasks & Kanban', icon: ListTodo },
  { id: 'invoices', label: 'Invoices & Documents', icon: FileText },
  { id: 'expenses', label: 'Expenses', icon: Wallet },
  { id: 'onboarding', label: 'Client Onboarding', icon: LogIn },
  { id: 'integrations', label: 'Integrations & Tools', icon: Box },
  { id: 'analytics', label: 'Analytics & Cashflow', icon: BarChart3 },
];

export const RuneySidebar: React.FC = () => {
  const { currentTab, setCurrentTab, setQuickSearchOpen } = useRuneyStore();

  return (
    <aside className="fixed left-4 top-4 bottom-4 z-50 flex flex-col justify-between items-center w-[54px] py-4 bg-[#0a0a0c] text-white rounded-[28px] shadow-2xl border border-white/10 select-none">
      {/* Top Section: Logo & Quick Add (+) */}
      <div className="flex flex-col items-center gap-3">
        {/* Brand Circular R Logo */}
        <button
          onClick={() => setCurrentTab('dashboard')}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black font-black text-lg shadow-sm hover:scale-105 active:scale-95 transition-transform"
          title="Runey Home"
        >
          <span className="font-extrabold tracking-tighter text-sm">R</span>
        </button>

        {/* Small '+' Action Button */}
        <button
          onClick={() => setQuickSearchOpen(true)}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors text-xs"
          title="Quick Create Task / Invoice"
        >
          <Plus size={14} />
        </button>

        <div className="w-5 h-[1px] bg-white/10 my-0.5" />

        {/* 9 Main Module Navigation Icons */}
        <nav className="flex flex-col items-center gap-1.5">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <div key={item.id} className="relative group flex items-center">
                <button
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-black shadow-md shadow-white/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={17} strokeWidth={isActive ? 2.3 : 1.8} />
                </button>

                {/* Apple-style floating tooltip bubble */}
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#18181b] text-white text-[11px] font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-xl">
                  {item.label}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: AI, Settings, Help, Workspace Hexagon */}
      <div className="flex flex-col items-center gap-2 pt-2 border-t border-white/10">
        {/* AI Studio Assistant */}
        <div className="relative group flex items-center">
          <button
            onClick={() => setCurrentTab('ai')}
            className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-150 ${
              currentTab === 'ai'
                ? 'bg-gradient-to-tr from-pink-500 to-indigo-500 text-white shadow-lg shadow-pink-500/30'
                : 'text-pink-400 hover:text-pink-300 hover:bg-white/10'
            }`}
          >
            <Sparkles size={16} />
          </button>
          <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#18181b] text-pink-300 text-[11px] font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-xl">
            AI Assistant (BYOK)
          </div>
        </div>

        {/* Settings Gear */}
        <div className="relative group flex items-center">
          <button
            onClick={() => setCurrentTab('settings')}
            className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-150 ${
              currentTab === 'settings'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Settings size={17} strokeWidth={1.8} />
          </button>
          <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#18181b] text-white text-[11px] font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-xl">
            Settings
          </div>
        </div>

        {/* Help Circle */}
        <div className="relative group flex items-center">
          <button
            onClick={() => window.open('https://runey.app', '_blank')}
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <HelpCircle size={17} strokeWidth={1.8} />
          </button>
          <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#18181b] text-white text-[11px] font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-xl">
            Help & Documentation
          </div>
        </div>

        {/* Workspace Hexagon Switcher */}
        <div className="relative group flex items-center mt-1">
          <button
            className="w-9 h-9 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-200 hover:text-white transition-all shadow-inner"
            title="Switch Workspace"
          >
            <Hexagon size={16} strokeWidth={2} />
          </button>
          <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#18181b] text-white text-[11px] font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-xl">
            Workspace: Apex Studio
          </div>
        </div>
      </div>
    </aside>
  );
};
