'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Clock,
  CheckCircle,
  MoreVertical,
  Calendar,
  AlertCircle,
  Tag,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useRuneyStore } from '@/lib/store';
import { TaskStatus, TaskPriority, Task } from '@/lib/types';

const columns: { id: TaskStatus; title: string; accent: string }[] = [
  { id: 'backlog', title: 'Backlog', accent: 'border-zinc-500/30 text-zinc-400' },
  { id: 'in_progress', title: 'In Progress', accent: 'border-indigo-500/40 text-indigo-400' },
  { id: 'in_review', title: 'In Review', accent: 'border-amber-500/40 text-amber-400' },
  { id: 'done', title: 'Done', accent: 'border-emerald-500/40 text-emerald-400' },
];

export const KanbanBoardView: React.FC = () => {
  const { tasks, projects, moveTask, createTask, startTimer } = useRuneyStore();
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('all');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newProjectId, setNewProjectId] = useState(projects[0]?.id || '');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const [newDueDate, setNewDueDate] = useState('2026-09-22');
  const [newEstimatedMins, setNewEstimatedMins] = useState(120);

  const filteredTasks = selectedProjectFilter === 'all'
    ? tasks
    : tasks.filter((t) => t.projectId === selectedProjectFilter);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createTask({
      projectId: newProjectId,
      title: newTitle,
      description: newDesc,
      status: 'backlog',
      priority: newPriority,
      dueDate: newDueDate,
      estimatedMinutes: Number(newEstimatedMins),
      trackedMinutes: 0,
      tags: ['General'],
    });

    setNewTitle('');
    setNewDesc('');
    setIsNewTaskModalOpen(false);
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'medium':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'low':
        return 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Project Tasks & Kanban</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {filteredTasks.length} total tasks
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Drag cards across columns or use quick transition controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Project Filter Select */}
          <div className="flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-xl border border-white/10">
            <Filter size={13} className="text-zinc-400" />
            <select
              value={selectedProjectFilter}
              onChange={(e) => setSelectedProjectFilter(e.target.value)}
              className="bg-transparent text-xs text-zinc-200 outline-none cursor-pointer"
            >
              <option value="all" className="bg-zinc-900 text-white">
                All Projects ({projects.length})
              </option>
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-zinc-900 text-white">
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Plus size={14} />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* 4 Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className="glass-panel rounded-3xl p-3.5 border border-white/10 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 px-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.accent.split(' ')[0].replace('border', 'bg')}`} />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">{col.title}</h3>
                </div>
                <span className="text-[11px] font-mono font-bold text-zinc-400 px-2 py-0.5 rounded-full bg-white/5">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="flex-1 space-y-3 overflow-y-auto pr-0.5 custom-scrollbar">
                {colTasks.map((task) => {
                  const project = projects.find((p) => p.id === task.projectId);

                  return (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card rounded-2xl p-3.5 border border-white/10 space-y-2.5 relative group"
                    >
                      {/* Project Tag & Priority */}
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-[10px] font-semibold text-zinc-400 truncate max-w-[140px]">
                          {project?.title || 'General'}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border ${getPriorityBadge(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h4 className="text-xs font-bold text-white leading-snug">{task.title}</h4>
                      {task.description && (
                        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      {/* Footer Metadata: Due Date & Timer Trigger */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={11} className="text-zinc-500" />
                          <span>{task.dueDate || 'No due date'}</span>
                        </div>

                        <button
                          onClick={() =>
                            startTimer({
                              projectId: task.projectId,
                              taskId: task.id,
                              clientId: project?.clientId || 'cli-1',
                              description: task.title,
                              hourlyRate: project?.hourlyRate || 150,
                            })
                          }
                          className="px-2 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Clock size={11} />
                          <span>Track</span>
                        </button>
                      </div>

                      {/* Status Transition Shortcut Buttons */}
                      <div className="pt-2 flex items-center gap-1 border-t border-white/5">
                        {col.id !== 'backlog' && (
                          <button
                            onClick={() => moveTask(task.id, 'backlog')}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            title="Move to Backlog"
                          >
                            Backlog
                          </button>
                        )}
                        {col.id !== 'in_progress' && (
                          <button
                            onClick={() => moveTask(task.id, 'in_progress')}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 transition-colors"
                            title="Move to In Progress"
                          >
                            In Progress
                          </button>
                        )}
                        {col.id !== 'in_review' && (
                          <button
                            onClick={() => moveTask(task.id, 'in_review')}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                            title="Move to Review"
                          >
                            Review
                          </button>
                        )}
                        {col.id !== 'done' && (
                          <button
                            onClick={() => moveTask(task.id, 'done')}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition-colors ml-auto"
                            title="Mark as Done"
                          >
                            Done ✓
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {colTasks.length === 0 && (
                  <div className="text-center py-12 px-3 border border-dashed border-white/5 rounded-2xl">
                    <p className="text-xs text-zinc-500 font-medium">No tasks in {col.title}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Task Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-panel rounded-3xl p-6 border border-white/15 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Create New Task</h3>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Build Liquid Glass Modal Component"
                  className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Key deliverables and acceptance criteria..."
                  className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Project</label>
                  <select
                    value={newProjectId}
                    onChange={(e) => setNewProjectId(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id} className="bg-zinc-900 text-white">
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  >
                    <option value="low" className="bg-zinc-900 text-white">Low</option>
                    <option value="medium" className="bg-zinc-900 text-white">Medium</option>
                    <option value="high" className="bg-zinc-900 text-white">High</option>
                    <option value="urgent" className="bg-zinc-900 text-white">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Estimated Mins</label>
                  <input
                    type="number"
                    value={newEstimatedMins}
                    onChange={(e) => setNewEstimatedMins(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all"
                >
                  Save Task
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
