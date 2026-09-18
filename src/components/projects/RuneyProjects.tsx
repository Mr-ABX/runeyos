import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  DollarSign,
  Users,
  ArrowUpRight,
  MoreHorizontal,
  ChevronRight,
} from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';

export const RuneyProjects: React.FC = () => {
  const { setCurrentTab, setSelectedTask } = useRuneyStore();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    {
      id: 'proj-analytics',
      title: 'Dashboard Analytics Suite',
      client: 'Kredo Capital',
      clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
      progress: 68,
      totalBudget: '€24,500',
      spent: '€16,800',
      dueDate: 'Oct 24, 2026',
      status: 'in_progress',
      tasksCount: 14,
      completedTasks: 9,
      team: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      ],
    },
    {
      id: 'proj-mobile',
      title: 'iOS & Android Neobank App',
      client: 'FinFlow Inc',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
      progress: 42,
      totalBudget: '€38,000',
      spent: '€15,200',
      dueDate: 'Nov 15, 2026',
      status: 'in_progress',
      tasksCount: 22,
      completedTasks: 8,
      team: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      ],
    },
    {
      id: 'proj-branding',
      title: 'Brand Identity & Design System',
      client: 'Aether Labs',
      clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800',
      progress: 100,
      totalBudget: '€12,000',
      spent: '€12,000',
      dueDate: 'Completed',
      status: 'completed',
      tasksCount: 10,
      completedTasks: 10,
      team: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      ],
    },
    {
      id: 'proj-ecommerce',
      title: 'Luxury Watch Storefront',
      client: 'Chronos Horology',
      clientAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100',
      coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
      progress: 85,
      totalBudget: '€19,400',
      spent: '€16,500',
      dueDate: 'Oct 10, 2026',
      status: 'in_progress',
      tasksCount: 18,
      completedTasks: 15,
      team: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      ],
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'active' && p.status === 'completed') return false;
    if (filter === 'completed' && p.status !== 'completed') return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.client.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner Hero */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 bg-black min-h-[160px] flex items-center p-8">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600"
          alt="Banner Cover"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide uppercase border border-white/20">
              Workspace Projects
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Active Client Initiatives</h1>
            <p className="text-xs sm:text-sm text-gray-200">
              Manage multi-phase client deliverables, budgets, and track real-time milestone progress.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('tasks')}
              className="px-4 py-2.5 rounded-2xl bg-white text-gray-900 font-bold text-xs shadow-md hover:bg-gray-100 transition-all flex items-center gap-2 active:scale-95"
            >
              <FolderKanban size={15} />
              <span>Open Kanban Board</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-200/80 shadow-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === 'all' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Projects ({projects.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === 'active' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active (3)
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === 'completed' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Completed (1)
          </button>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by client or title..."
            className="text-xs pl-9 pr-4 py-2 rounded-2xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 w-64 shadow-xs"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -3 }}
            className="bg-white rounded-3xl border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col group cursor-pointer"
            onClick={() => setCurrentTab('tasks')}
          >
            {/* Card Hero Cover Image */}
            <div className="relative h-40 w-full overflow-hidden bg-gray-100">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-gray-900 shadow-sm">
                  {project.client}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-1 text-[11px] font-semibold">
                  <Calendar size={13} />
                  <span>Due: {project.dueDate}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>{project.completedTasks}/{project.tasksCount} Tasks</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Budget: <span className="font-semibold text-gray-900">{project.totalBudget}</span> • Billed:{' '}
                  <span className="font-semibold text-emerald-600">{project.spent}</span>
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-500 font-medium">Progress</span>
                  <span className="font-bold text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center -space-x-2">
                  {project.team.map((avatar, idx) => (
                    <img
                      key={idx}
                      src={avatar}
                      alt="Member"
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-black">
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
