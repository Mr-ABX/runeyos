import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FolderKanban,
  Users,
  CreditCard,
  FileText,
  Clock,
  Settings,
  Sparkles,
  Plus,
  ArrowRight,
  Command,
  X,
} from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';
import { RuneyTab } from '@/types';

export const RuneyQuickSearchModal: React.FC = () => {
  const {
    isQuickSearchOpen,
    setQuickSearchOpen,
    setCurrentTab,
    clients,
    tasks,
    startTimer,
    createTask,
  } = useRuneyStore();

  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setQuickSearchOpen(!isQuickSearchOpen);
      }
      if (e.key === 'Escape' && isQuickSearchOpen) {
        setQuickSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuickSearchOpen, setQuickSearchOpen]);

  useEffect(() => {
    if (isQuickSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearch('');
    }
  }, [isQuickSearchOpen]);

  if (!isQuickSearchOpen) return null;

  const navItems: { label: string; tab: RuneyTab; icon: any }[] = [
    { label: 'Executive Dashboard', tab: 'dashboard', icon: FolderKanban },
    { label: 'Kanban Board & Tasks', tab: 'tasks', icon: FolderKanban },
    { label: 'Client CRM & Timelines', tab: 'clients', icon: Users },
    { label: 'Expenses & Vendor Spending', tab: 'expenses', icon: CreditCard },
    { label: 'Invoices & Billing', tab: 'invoices', icon: FileText },
    { label: 'Client Onboarding Portals', tab: 'onboarding', icon: Users },
    { label: 'Runey AI Studio (BYOK)', tab: 'ai', icon: Sparkles },
    { label: 'Settings & Integrations', tab: 'settings', icon: Settings },
  ];

  const filteredNav = navItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectTab = (tab: RuneyTab) => {
    setCurrentTab(tab);
    setQuickSearchOpen(false);
  };

  const handleQuickCreateTask = () => {
    if (!search.trim()) return;
    createTask({ title: search.trim(), status: 'todo', priority: 'medium' });
    setCurrentTab('tasks');
    setQuickSearchOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickSearchOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-10 flex flex-col max-h-[80vh]"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-gray-100 gap-3">
            <Search size={18} className="text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search views, tasks, clients, or type a command..."
              className="flex-1 text-sm bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400"
            />
            <button
              onClick={() => setQuickSearchOpen(false)}
              className="w-7 h-7 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto p-3 space-y-4 custom-scrollbar text-xs">
            {/* Quick Actions */}
            {search.trim() && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-1">
                  Quick Actions
                </p>
                <div
                  onClick={handleQuickCreateTask}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer text-gray-900 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center">
                      <Plus size={14} />
                    </div>
                    <span>
                      Create task <strong>"{search}"</strong>
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 group-hover:text-black flex items-center gap-1 font-semibold">
                    <span>Add to Kanban</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            )}

            {/* Views */}
            {filteredNav.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-1">
                  Navigation Views
                </p>
                <div className="space-y-0.5">
                  {filteredNav.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.tab}
                        onClick={() => handleSelectTab(item.tab)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer text-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={16} className="text-gray-500" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase">Jump</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Matching Tasks */}
            {filteredTasks.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-1">
                  Tasks ({filteredTasks.length})
                </p>
                <div className="space-y-0.5">
                  {filteredTasks.slice(0, 4).map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleSelectTab('tasks')}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer text-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-medium text-gray-900">{task.title}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 capitalize">{task.status.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Clients */}
            {filteredClients.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-1">
                  Clients ({filteredClients.length})
                </p>
                <div className="space-y-0.5">
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => handleSelectTab('clients')}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer text-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={client.avatar} alt={client.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-medium text-gray-900">{client.name}</span>
                        <span className="text-[11px] text-gray-400">({client.company})</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600">€{client.totalBilled.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 shadow-xs font-mono text-[10px]">
                  ↑↓
                </kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 shadow-xs font-mono text-[10px]">
                  ESC
                </kbd>
                <span>Close</span>
              </span>
            </div>
            <div className="flex items-center gap-1 font-medium text-gray-500">
              <Command size={11} />
              <span>RuneyOS Instant Actions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
