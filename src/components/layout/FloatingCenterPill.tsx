import React from 'react';
import {
  LayoutGrid,
  ListTodo,
  Clock,
  FileText,
  Folder,
  FileCode,
  Edit3,
  Activity,
} from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';
import { TaskViewMode } from '@/types';

export const FloatingCenterPill: React.FC = () => {
  const { taskViewMode, setTaskViewMode, setCurrentTab } = useRuneyStore();

  return (
    <div className="flex items-center justify-center w-full mb-4">
      <div className="flex items-center gap-1 bg-white px-2 py-1.5 rounded-full border border-zinc-200/90 shadow-runey-card">
        {/* View mode 1: Board / Kanban */}
        <button
          onClick={() => {
            setCurrentTab('tasks');
            setTaskViewMode('board');
          }}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            taskViewMode === 'board'
              ? 'bg-zinc-900 text-white shadow-xs'
              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
          title="Board View (Kanban)"
        >
          <LayoutGrid size={14} />
        </button>

        {/* View mode 2: List */}
        <button
          onClick={() => {
            setCurrentTab('tasks');
            setTaskViewMode('list');
          }}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            taskViewMode === 'list'
              ? 'bg-zinc-900 text-white shadow-xs'
              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
          title="List View"
        >
          <ListTodo size={14} />
        </button>

        {/* View mode 3: Time Tracking */}
        <button
          onClick={() => setCurrentTab('expenses')}
          className="w-7 h-7 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 flex items-center justify-center transition-colors"
          title="Time & Expenses"
        >
          <Clock size={14} />
        </button>

        {/* Invoices */}
        <button
          onClick={() => setCurrentTab('invoices')}
          className="w-7 h-7 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 flex items-center justify-center transition-colors"
          title="Documents & Invoices"
        >
          <FileText size={14} />
        </button>

        {/* Projects */}
        <button
          onClick={() => setCurrentTab('projects')}
          className="w-7 h-7 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 flex items-center justify-center transition-colors"
          title="Projects"
        >
          <Folder size={14} />
        </button>

        {/* Onboarding */}
        <button
          onClick={() => setCurrentTab('onboarding')}
          className="w-7 h-7 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 flex items-center justify-center transition-colors"
          title="Onboarding Link"
        >
          <FileCode size={14} />
        </button>

        {/* Edit / Notes */}
        <button
          onClick={() => setCurrentTab('clients')}
          className="w-7 h-7 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 flex items-center justify-center transition-colors"
          title="Clients & CRM"
        >
          <Edit3 size={14} />
        </button>

        {/* Activity */}
        <button
          onClick={() => setCurrentTab('analytics')}
          className="w-7 h-7 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 flex items-center justify-center transition-colors"
          title="Analytics & Cashflow"
        >
          <Activity size={14} />
        </button>
      </div>
    </div>
  );
};
