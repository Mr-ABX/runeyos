'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  Plus,
  Calendar,
  DollarSign,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useRuneyStore } from '@/lib/store';

export const ProjectsView: React.FC = () => {
  const { projects, clients, createProject, setActiveTab } = useRuneyStore();
  const [isNewProjModalOpen, setIsNewProjModalOpen] = useState(false);

  // New Project Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [budget, setBudget] = useState(15000);
  const [hourlyRate, setHourlyRate] = useState(150);
  const [deadline, setDeadline] = useState('2026-11-01');
  const [accentColor, setAccentColor] = useState('#6366f1');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const client = clients.find((c) => c.id === clientId);

    createProject({
      title,
      description,
      clientId,
      clientName: client?.company || 'General Client',
      status: 'active',
      budget: Number(budget),
      hourlyRate: Number(hourlyRate),
      deadline,
      accentColor,
    });

    setTitle('');
    setDescription('');
    setIsNewProjModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Client Projects</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {projects.length} total workspaces
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Organize agency work, track deliverables, and manage milestone budgets.
          </p>
        </div>

        <button
          onClick={() => setIsNewProjModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus size={14} />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => {
          const progress = Math.round(
            (project.completedTasks / Math.max(1, project.totalTasks)) * 100
          );

          return (
            <motion.div
              key={project.id}
              whileHover={{ y: -3 }}
              className="glass-panel rounded-3xl p-5 border border-white/10 hover:border-white/20 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="text-xs font-semibold text-zinc-400">{project.clientName}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {project.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{project.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Milestone Progress</span>
                    <span className="font-mono font-bold text-white">{progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%`, backgroundColor: project.accentColor }}
                    />
                  </div>
                </div>

                {/* Metadata Pill Specs */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold block">
                      Tracked Hours
                    </span>
                    <span className="font-bold text-white font-mono">{project.trackedHours} hrs</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold block">
                      Target Budget
                    </span>
                    <span className="font-bold text-cyan-300 font-mono">
                      ${project.budget.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <Calendar size={12} className="text-zinc-500" />
                  <span>Due {project.deadline}</span>
                </div>

                <button
                  onClick={() => setActiveTab('tasks')}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1"
                >
                  <span>Open Tasks</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* New Project Modal */}
      {isNewProjModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-panel rounded-3xl p-6 border border-white/15 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Create New Project</h3>
              <button
                onClick={() => setIsNewProjModalOpen(false)}
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. NextGen Web App Redesign"
                  className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Scope of work and milestones..."
                  className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Client</label>
                  <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id} className="bg-zinc-900 text-white">
                        {c.company}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Budget ($)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Target Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsNewProjModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all"
                >
                  Save Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
