'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Clock,
  Users,
  Receipt,
  Sparkles,
  Settings,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { useRuneyStore, NavigationTab } from '@/lib/store';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  isAi?: boolean;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'tasks', label: 'Tasks (Kanban)', icon: CheckSquare },
  { id: 'time', label: 'Time Tracking', icon: Clock },
  { id: 'clients', label: 'Clients & CRM', icon: Users },
  { id: 'invoices', label: 'Invoices & Finance', icon: Receipt },
  { id: 'portal', label: 'Client Portal', icon: ExternalLink, badge: 'Live' },
  { id: 'ai', label: 'AI Studio', icon: Sparkles, badge: 'Soon', isAi: true },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const FloatingPillSidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    toggleSidebar,
    timer,
  } = useRuneyStore();

  return (
    <aside
      className={`fixed left-4 top-4 bottom-4 z-40 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        sidebarCollapsed ? 'w-[72px]' : 'w-[250px]'
      }`}
    >
      <div className="flex-1 flex flex-col glass-panel rounded-3xl p-3 relative overflow-hidden border border-white/10 shadow-2xl">
        {/* Workspace Brand / Header */}
        <div className="flex items-center justify-between px-2 py-3 mb-2 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <span className="font-black text-white text-lg tracking-wider">R</span>
            </div>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col truncate"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-tight text-white truncate">RuneyOS</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                    Pro
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 truncate">Apex Design Studio</span>
              </motion.div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Quick Create CTA (Only when expanded) */}
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-1 mb-3"
          >
            <button
              onClick={() => setActiveTab('tasks')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-medium text-xs shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
            >
              <Plus size={14} />
              <span>New Task / Project</span>
            </button>
          </motion.div>
        )}

        {/* Navigation Items List */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-0.5 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full group relative flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white border border-white/15 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {/* Active Indicator Glow Pip */}
                {isActive && (
                  <motion.div
                    layoutId="activePillIndicator"
                    className="absolute left-1.5 w-1 h-5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div
                  className={`p-1.5 rounded-xl shrink-0 transition-colors ${
                    isActive
                      ? 'bg-indigo-500/20 text-cyan-300'
                      : item.isAi
                      ? 'text-pink-400 group-hover:text-pink-300'
                      : 'text-zinc-400 group-hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                </div>

                {!sidebarCollapsed && (
                  <div className="flex-1 flex items-center justify-between truncate text-left">
                    <span className="text-xs font-medium tracking-tight truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                          item.isAi
                            ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Tooltip for collapsed mode */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-zinc-900/90 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-xl">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Ambient Timer Mini-Indicator when Running */}
        {timer.isRunning && (
          <div className="mt-2 p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            {!sidebarCollapsed && (
              <div className="flex-1 truncate text-left">
                <p className="text-[10px] text-emerald-400 font-semibold tracking-wide uppercase">Timer Active</p>
                <p className="text-xs font-bold text-white truncate">
                  {Math.floor(timer.seconds / 60)}m {timer.seconds % 60}s
                </p>
              </div>
            )}
          </div>
        )}

        {/* User Account / Footer */}
        <div className="pt-2 mt-2 border-t border-white/5 flex items-center gap-2.5 px-1">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="User avatar"
            className="w-8 h-8 rounded-full border border-white/15 object-cover shrink-0"
          />
          {!sidebarCollapsed && (
            <div className="flex-1 truncate text-left">
              <p className="text-xs font-semibold text-white truncate">Julian Reed</p>
              <p className="text-[10px] text-zinc-400 truncate">Lead Designer & CPO</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
