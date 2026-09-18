import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Users,
  Folder,
  ListTodo,
  FileText,
  Wallet,
  Receipt,
  FileCheck,
  FileSignature,
  Package,
  BarChart3,
  Settings,
  HelpCircle,
  Plus,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
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
  { id: 'clients', label: 'Customers', icon: Users },
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'invoices', label: 'Invoices', icon: FileText },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'quotes', label: 'Quotes', icon: FileCheck },
  { id: 'proposals', label: 'Proposals', icon: FileSignature },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'analytics', label: 'Report', icon: BarChart3 },
  { id: 'chat', label: 'Team Chat', icon: MessageSquare },
];

export const RuneySidebar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    setQuickSearchOpen,
    sidebarExpanded,
    toggleSidebar,
  } = useRuneyStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarExpanded ? 220 : 60 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      className="fixed left-4 top-4 bottom-4 z-50 flex flex-col justify-between py-3.5 px-2.5 bg-[#0d0d0f] text-white rounded-[32px] shadow-2xl border border-white/10 select-none overflow-hidden"
    >
      {/* Top Header: Logo + Toggle & '+ New' Button */}
      <div className="flex flex-col gap-3">
        {/* Brand Row */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black font-black text-sm shadow-sm hover:scale-105 active:scale-95 transition-transform shrink-0"
              title="Runey Home"
            >
              <span className="font-extrabold tracking-tighter">R</span>
            </button>
            <AnimatePresence>
              {sidebarExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                  className="font-bold text-sm tracking-tight text-white whitespace-nowrap"
                >
                  Runey
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Expand / Collapse Chevron Button */}
          <button
            onClick={toggleSidebar}
            className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-colors text-xs shrink-0"
            title={sidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {sidebarExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>

        {/* '+ New' Button (Matching Screenshot 6!) */}
        <div className="px-0.5">
          <button
            onClick={() => setQuickSearchOpen(true)}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white font-semibold text-xs border border-white/10 shadow-sm ${
              sidebarExpanded ? 'px-3' : 'px-0'
            }`}
            title="Create New (Task, Invoice, Customer)"
          >
            <Plus size={15} className="shrink-0" />
            <AnimatePresence>
              {sidebarExpanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="whitespace-nowrap font-medium"
                >
                  New
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Nav Items List */}
        <nav className="flex flex-col gap-1 mt-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-3 px-2.5 py-2 rounded-xl transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10 font-medium'
                }`}
                title={!sidebarExpanded ? item.label : undefined}
              >
                <Icon size={17} strokeWidth={isActive ? 2.4 : 1.9} className="shrink-0" />
                <AnimatePresence>
                  {sidebarExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.15 }}
                      className="text-xs whitespace-nowrap tracking-normal overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Floating Tooltip when collapsed */}
                {!sidebarExpanded && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#18181b] text-white text-[11px] font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-xl">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: AI, Settings & Help (Matching Screenshot 6) */}
      <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
        {/* AI Studio Assistant */}
        <button
          onClick={() => setCurrentTab('ai')}
          className={`flex items-center gap-3 px-2.5 py-2 rounded-xl transition-all duration-150 group relative ${
            currentTab === 'ai'
              ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold shadow-lg shadow-pink-500/20'
              : 'text-pink-400 hover:text-pink-300 hover:bg-white/10 font-medium'
          }`}
          title={!sidebarExpanded ? 'AI Studio (BYOK)' : undefined}
        >
          <Sparkles size={17} className="shrink-0" />
          <AnimatePresence>
            {sidebarExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="text-xs whitespace-nowrap overflow-hidden"
              >
                AI Studio
              </motion.span>
            )}
          </AnimatePresence>

          {!sidebarExpanded && (
            <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#18181b] text-pink-300 text-[11px] font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-xl">
              AI Studio (BYOK)
            </div>
          )}
        </button>

        {/* Settings */}
        <button
          onClick={() => setCurrentTab('settings')}
          className={`flex items-center gap-3 px-2.5 py-2 rounded-xl transition-all duration-150 group relative ${
            currentTab === 'settings'
              ? 'bg-white text-black font-bold shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-white/10 font-medium'
          }`}
          title={!sidebarExpanded ? 'Settings' : undefined}
        >
          <Settings size={17} strokeWidth={1.9} className="shrink-0" />
          <AnimatePresence>
            {sidebarExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="text-xs whitespace-nowrap overflow-hidden"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>

          {!sidebarExpanded && (
            <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#18181b] text-white text-[11px] font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-xl">
              Settings
            </div>
          )}
        </button>

        {/* Help */}
        <button
          onClick={() => window.open('https://runey.app', '_blank')}
          className="flex items-center gap-3 px-2.5 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all font-medium group relative"
          title={!sidebarExpanded ? 'Help & Documentation' : undefined}
        >
          <HelpCircle size={17} strokeWidth={1.9} className="shrink-0" />
          <AnimatePresence>
            {sidebarExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="text-xs whitespace-nowrap overflow-hidden"
              >
                Help
              </motion.span>
            )}
          </AnimatePresence>

          {!sidebarExpanded && (
            <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#18181b] text-white text-[11px] font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-xl">
              Help & Documentation
            </div>
          )}
        </button>
      </div>
    </motion.aside>
  );
};
