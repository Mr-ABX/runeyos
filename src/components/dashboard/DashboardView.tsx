'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Clock,
  FolderKanban,
  Receipt,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useRuneyStore } from '@/lib/store';

export const DashboardView: React.FC = () => {
  const {
    projects,
    tasks,
    invoices,
    timeEntries,
    selectedDate,
    setActiveTab,
    startTimer,
  } = useRuneyStore();

  const totalRevenue = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((acc, inv) => acc + inv.totalAmount, 0);

  const outstandingBalance = invoices
    .filter((inv) => inv.status === 'sent' || inv.status === 'overdue')
    .reduce((acc, inv) => acc + inv.totalAmount, 0);

  const totalTrackedHours = timeEntries
    .reduce((acc, t) => acc + t.durationSeconds / 3600, 0)
    .toFixed(1);

  // Filter tasks for the selected date on the Liquid Calendar Bar
  const agendaTasks = tasks.filter((t) => t.dueDate === selectedDate);
  const urgentTasks = tasks.filter((t) => t.priority === 'urgent' && t.status !== 'done');

  return (
    <div className="space-y-6 pb-20">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
            <span>Executive Studio Dashboard</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Live
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Welcome back, Julian. You have <strong className="text-white">{urgentTasks.length} urgent tasks</strong>{' '}
            and <strong className="text-emerald-400">${outstandingBalance.toLocaleString()}</strong> in open invoices.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('invoices')}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Receipt size={14} className="text-emerald-400" />
            <span>Manage Invoices</span>
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Sparkles size={14} />
            <span>Open Kanban</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Revenue */}
        <motion.div
          whileHover={{ y: -3 }}
          className="glass-card rounded-2xl p-4 border border-white/10 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">Total Billed (Paid)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-black text-white font-mono tracking-tight">
              ${totalRevenue.toLocaleString()}
            </h2>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400 font-medium">
              <TrendingUp size={12} />
              <span>+18.4% from last month</span>
            </div>
          </div>
        </motion.div>

        {/* Metric 2: Outstanding Invoices */}
        <motion.div
          whileHover={{ y: -3 }}
          className="glass-card rounded-2xl p-4 border border-white/10 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">Pending Invoices</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Receipt size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-black text-amber-300 font-mono tracking-tight">
              ${outstandingBalance.toLocaleString()}
            </h2>
            <span className="text-[11px] text-zinc-400">
              {invoices.filter((i) => i.status === 'sent').length} client invoices pending
            </span>
          </div>
        </motion.div>

        {/* Metric 3: Tracked Billable Hours */}
        <motion.div
          whileHover={{ y: -3 }}
          className="glass-card rounded-2xl p-4 border border-white/10 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">Tracked Time</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Clock size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-black text-white font-mono tracking-tight">
              {totalTrackedHours} <span className="text-sm font-normal text-zinc-400">hrs</span>
            </h2>
            <span className="text-[11px] text-cyan-400 font-medium">
              {timeEntries.filter((t) => !t.isBilled).length} unbilled sessions ready
            </span>
          </div>
        </motion.div>

        {/* Metric 4: Active Projects */}
        <motion.div
          whileHover={{ y: -3 }}
          className="glass-card rounded-2xl p-4 border border-white/10 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">Active Workspaces</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FolderKanban size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-black text-white font-mono tracking-tight">
              {projects.filter((p) => p.status === 'active').length}{' '}
              <span className="text-sm font-normal text-zinc-400">/ {projects.length}</span>
            </h2>
            <span className="text-[11px] text-indigo-300 font-medium">92% on-time milestone delivery</span>
          </div>
        </motion.div>
      </div>

      {/* Main Grid: Agenda & Active Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Projects & Kanban Sneak-Peek */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <FolderKanban size={18} className="text-indigo-400" />
              <span>Active Client Projects</span>
            </h3>
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs font-medium text-indigo-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((project) => {
              const progress = Math.round((project.completedTasks / Math.max(1, project.totalTasks)) * 100);

              return (
                <div
                  key={project.id}
                  className="glass-panel rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      <h4 className="text-sm font-bold text-white tracking-tight">{project.title}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                        {project.clientName}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1">{project.description}</p>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${progress}%`, backgroundColor: project.accentColor }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400 font-semibold">{progress}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] text-zinc-400 uppercase font-semibold">Budget Billed</p>
                      <p className="text-xs font-bold text-white font-mono">
                        ${project.billedAmount.toLocaleString()} / ${project.budget.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('tasks')}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
                    >
                      Kanban
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Selected Date Agenda (Liquid Calendar Bar Linkage) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle2 size={18} className="text-cyan-400" />
              <span>Agenda: {selectedDate}</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {agendaTasks.length} Due
            </span>
          </div>

          <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-3">
            {agendaTasks.length > 0 ? (
              agendaTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="text-xs font-bold text-white leading-snug">{task.title}</h5>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        task.priority === 'urgent'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                    <span className="font-mono">{task.estimatedMinutes}m est.</span>
                    <button
                      onClick={() =>
                        startTimer({
                          projectId: task.projectId,
                          taskId: task.id,
                          clientId: 'cli-1',
                          description: task.title,
                          hourlyRate: 150,
                        })
                      }
                      className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      <Clock size={12} />
                      <span>Start Timer</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 space-y-2">
                <AlertCircle size={24} className="mx-auto text-zinc-500 opacity-60" />
                <p className="text-xs text-zinc-400 font-medium">No deadlines scheduled for {selectedDate}.</p>
                <p className="text-[10px] text-zinc-500">
                  Select another day on the top calendar bar or click below to add a task.
                </p>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  + Add task for this day
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
