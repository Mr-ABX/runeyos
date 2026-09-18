import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Filter,
  Layers,
  LayoutGrid,
  ListTodo,
  MoreHorizontal,
  Play,
  Plus,
  Share2,
  Table as TableIcon,
  Tag,
  X,
} from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';
import { RuneyTask, TaskStatus, TaskViewMode } from '@/types';

const statusColumns: { id: TaskStatus; label: string; dotColor: string }[] = [
  { id: 'request', label: 'Request', dotColor: 'bg-amber-500' },
  { id: 'todo', label: 'To Do', dotColor: 'bg-zinc-800' },
  { id: 'in_progress', label: 'In Progress', dotColor: 'bg-blue-500' },
  { id: 'review', label: 'Review', dotColor: 'bg-amber-400' },
];

export const RuneyKanban: React.FC = () => {
  const {
    tasks,
    selectedTask,
    setSelectedTask,
    moveTaskStatus,
    toggleChecklistItem,
    addTaskTimeLog,
    createTask,
    taskViewMode,
    setTaskViewMode,
    startTimer,
  } = useRuneyStore();

  const [newChecklistText, setNewChecklistText] = useState('');
  const [isAddingTime, setIsAddingTime] = useState(false);
  const [newTimeDuration, setNewTimeDuration] = useState('1h 30m');
  const [newTimeCost, setNewTimeCost] = useState(150);

  const completedCount = tasks.filter((t) => t.status === 'review').length;
  const progressPercent = Math.round((completedCount / Math.max(1, tasks.length)) * 100);

  return (
    <div className="relative pb-24 max-w-7xl mx-auto space-y-4">
      {/* 1. Fluid Colorful Landscape / Artwork Banner (Matching Screenshot 5!) */}
      <div className="relative h-44 sm:h-52 w-full rounded-3xl overflow-hidden shadow-runey-card">
        {/* Apple-like fluid colorful gradient / landscape wallpaper */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-rose-500 to-indigo-600 opacity-90" />
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80"
          alt="Project Landscape"
          className="w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* 2. Project Header Card (Overlapping Banner) */}
      <div className="runey-card p-6 -mt-14 relative z-10 mx-2 sm:mx-4 shadow-runey-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Black square "R" logo icon */}
            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white shadow-md shrink-0">
              <span className="font-extrabold text-2xl tracking-tighter">R</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                  Dashboard Analytics
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-700">
                  Nordic Wave AB
                </span>
              </div>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-medium">
                <span>Budget €18,000</span>
                <span>•</span>
                <span>Created Mar 25</span>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50"
                    alt="Author"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>Created by Me</span>
                </div>
              </div>
            </div>
          </div>

          {/* View Mode Switcher Pills */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-zinc-100 p-1 rounded-full border border-zinc-200">
              <button
                onClick={() => setTaskViewMode('board')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  taskViewMode === 'board' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-black'
                }`}
              >
                <LayoutGrid size={13} />
                <span>Board</span>
              </button>
              <button
                onClick={() => setTaskViewMode('list')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  taskViewMode === 'list' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-black'
                }`}
              >
                <ListTodo size={13} />
                <span>List</span>
              </button>
              <button
                onClick={() => setTaskViewMode('table')}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  taskViewMode === 'table' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-black'
                }`}
              >
                <TableIcon size={13} />
                <span>Table</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tasks Filter & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-zinc-900">Tasks</h2>
          <span className="text-xs text-zinc-500 font-medium">
            {completedCount} of {tasks.length} done
          </span>
          <div className="w-24 h-2 rounded-full bg-zinc-200 overflow-hidden">
            <div
              className="h-full bg-zinc-900 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-zinc-700">{progressPercent}%</span>
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 text-xs">
          <button className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-zinc-200 text-zinc-700 font-medium hover:bg-zinc-50 shadow-runey-sm">
            <span>Date Created</span>
            <ChevronDown size={13} className="text-zinc-400" />
          </button>
          <button className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-zinc-200 text-zinc-700 font-medium hover:bg-zinc-50 shadow-runey-sm">
            <span>All</span>
            <ChevronDown size={13} className="text-zinc-400" />
          </button>
          <button className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-zinc-200 text-zinc-700 font-medium hover:bg-zinc-50 shadow-runey-sm">
            <span>All assignees</span>
            <ChevronDown size={13} className="text-zinc-400" />
          </button>
        </div>
      </div>

      {/* 4. Kanban Columns (Board View) */}
      {taskViewMode === 'board' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
          {statusColumns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);

            return (
              <div key={col.id} className="space-y-3">
                {/* Column Title */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                    <h3 className="text-xs font-bold text-zinc-900">{col.label}</h3>
                    <span className="text-xs text-zinc-400 font-semibold">{colTasks.length}</span>
                  </div>

                  <button
                    onClick={() =>
                      createTask({
                        title: 'New ' + col.label + ' Task',
                        status: col.id,
                        priority: 'medium',
                      })
                    }
                    className="w-5 h-5 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-black flex items-center justify-center transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 min-h-[300px]">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`runey-card p-3.5 space-y-2.5 cursor-pointer runey-card-hover ${
                        selectedTask?.id === task.id ? 'ring-2 ring-black' : ''
                      }`}
                    >
                      {/* Optional Cover Image Thumbnail (Matching Screenshot 5!) */}
                      {task.coverImage && (
                        <div className="h-24 w-full rounded-xl overflow-hidden">
                          <img
                            src={task.coverImage}
                            alt={task.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Title */}
                      <h4 className="text-xs font-bold text-zinc-900 leading-snug">{task.title}</h4>

                      {/* Badges: Priority, Design Category, Due Date, Cost */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                        {task.priority === 'high' && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold">
                            High
                          </span>
                        )}
                        {task.category && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold">
                            {task.category}
                          </span>
                        )}
                        {task.startDate && task.dueDate && (
                          <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-medium flex items-center gap-1">
                            <Calendar size={10} />
                            <span>
                              {task.startDate} → {task.dueDate}
                            </span>
                          </span>
                        )}
                        {task.cost !== undefined && task.cost > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-mono font-bold ml-auto">
                            €{task.cost}
                          </span>
                        )}
                      </div>

                      {/* Footer: Assignee avatar & checklist count */}
                      <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-400">
                        {task.assignee ? (
                          <div className="flex items-center gap-1.5">
                            <img
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                              className="w-4 h-4 rounded-full object-cover"
                            />
                            <span className="text-[10px] text-zinc-600 font-medium">
                              {task.assignee.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-zinc-400">Unassigned</span>
                        )}

                        {task.checklist.length > 0 && (
                          <span className="text-[10px] font-mono text-zinc-500">
                            {task.checklist.filter((c) => c.completed).length}/{task.checklist.length}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. List View Mode */}
      {taskViewMode === 'list' && (
        <div className="runey-card p-4 space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 border border-zinc-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    task.status === 'review'
                      ? 'bg-amber-400'
                      : task.status === 'in_progress'
                      ? 'bg-blue-500'
                      : task.status === 'todo'
                      ? 'bg-zinc-800'
                      : 'bg-amber-500'
                  }`}
                />
                <span className="text-xs font-bold text-zinc-900">{task.title}</span>
                {task.category && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700">
                    {task.category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="text-zinc-400 font-mono">{task.dueDate || 'No date'}</span>
                <span className="font-mono font-bold text-zinc-900">€{task.cost || 0}</span>
                <span className="text-zinc-500 capitalize">{task.status.replace('_', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. Table View Mode */}
      {taskViewMode === 'table' && (
        <div className="runey-card p-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                <th className="pb-3 px-2">Task Title</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2">Priority</th>
                <th className="pb-3 px-2">Assignee</th>
                <th className="pb-3 px-2">Due Date</th>
                <th className="pb-3 px-2 text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="hover:bg-zinc-50 cursor-pointer"
                >
                  <td className="py-3 px-2 font-semibold text-zinc-900">{task.title}</td>
                  <td className="py-3 px-2 capitalize">{task.status.replace('_', ' ')}</td>
                  <td className="py-3 px-2 capitalize">{task.priority}</td>
                  <td className="py-3 px-2">{task.assignee?.name || 'Unassigned'}</td>
                  <td className="py-3 px-2 font-mono text-zinc-400">{task.dueDate}</td>
                  <td className="py-3 px-2 text-right font-mono font-bold">€{task.cost || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 7. Right Slide-Over Task Detail Inspector (Matching Screenshot 5 EXACTLY!) */}
      {selectedTask && (
        <div className="fixed top-4 right-4 bottom-4 w-[380px] z-50 runey-card overflow-y-auto shadow-runey-lg border border-zinc-200 p-5 space-y-4 bg-white">
          {/* Top Hero Banner in Inspector */}
          {selectedTask.coverImage ? (
            <div className="h-32 w-full rounded-2xl overflow-hidden relative">
              <img
                src={selectedTask.coverImage}
                alt={selectedTask.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold shadow-xs">
                Review
              </span>
              <button
                onClick={() => setSelectedTask(null)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                {selectedTask.status}
              </span>
              <button
                onClick={() => setSelectedTask(null)}
                className="w-6 h-6 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-black flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Inspector Action Controls */}
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs text-zinc-400 font-semibold">{selectedTask.projectName}</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => startTimer(selectedTask.title)}
                className="w-7 h-7 rounded-full hover:bg-zinc-100 text-zinc-700 flex items-center justify-center"
                title="Start tracking time"
              >
                <Play size={13} />
              </button>
              <button className="w-7 h-7 rounded-full hover:bg-zinc-100 text-zinc-700 flex items-center justify-center">
                <Share2 size={13} />
              </button>
              <button className="w-7 h-7 rounded-full hover:bg-zinc-100 text-zinc-700 flex items-center justify-center">
                <MoreHorizontal size={13} />
              </button>
            </div>
          </div>

          {/* Title & Tags */}
          <div className="space-y-2">
            <h3 className="text-lg font-black text-zinc-900 leading-snug">{selectedTask.title}</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold text-[11px]">
                High
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold text-[11px]">
                Design
              </span>
              <div className="flex items-center gap-1.5 text-zinc-700 font-medium ml-1">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50"
                  alt="Tom Holland"
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span className="text-xs">Tom Holland</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-mono flex items-center gap-1">
              <Calendar size={12} />
              <span>Mar 26 → Apr 2</span>
            </p>
          </div>

          {/* Description */}
          <div className="text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
            {selectedTask.description ||
              'Allow users to export project tasks into a clean CSV file for reporting, backups, and external workflows.'}
          </div>

          {/* Time Tracked Section (Matching Screenshot 5!) */}
          <div className="border-t border-zinc-100 pt-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-900">
              <span>Time tracked</span>
              <button
                onClick={() => setIsAddingTime(!isAddingTime)}
                className="w-5 h-5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-black flex items-center justify-center"
              >
                <Plus size={13} />
              </button>
            </div>

            {isAddingTime && (
              <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newTimeDuration}
                    onChange={(e) => setNewTimeDuration(e.target.value)}
                    placeholder="2h 30m"
                    className="px-2 py-1 bg-white border border-zinc-200 rounded-lg text-xs"
                  />
                  <input
                    type="number"
                    value={newTimeCost}
                    onChange={(e) => setNewTimeCost(Number(e.target.value))}
                    placeholder="Cost (€)"
                    className="px-2 py-1 bg-white border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
                <button
                  onClick={() => {
                    addTaskTimeLog(selectedTask.id, newTimeDuration, newTimeCost);
                    setIsAddingTime(false);
                  }}
                  className="w-full py-1 bg-zinc-900 text-white rounded-lg font-semibold text-xs"
                >
                  Log Time Session
                </button>
              </div>
            )}

            <div className="space-y-2">
              {selectedTask.timeTracked.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.user.avatar}
                      alt={item.user.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-bold text-zinc-900">{item.duration}</span>
                    <span className="text-zinc-400 text-[11px] font-mono">→ {item.date}</span>
                  </div>
                  <span className="font-mono text-zinc-700 font-semibold">€{item.cost}</span>
                </div>
              ))}

              <div className="flex items-center justify-between pt-1 border-t border-zinc-100 text-xs font-semibold text-zinc-500">
                <span>Total time</span>
                <span className="font-bold text-zinc-900 font-mono">5h 15m €525</span>
              </div>
            </div>
          </div>

          {/* Additional Costs Section */}
          <div className="border-t border-zinc-100 pt-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-900">
              <span>Additional costs</span>
              <span className="text-zinc-400 font-normal">+</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 border border-zinc-100 text-xs">
              <span className="font-bold text-zinc-900 font-mono">€250</span>
              <span className="text-zinc-400">×</span>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs font-semibold text-zinc-500">
              <span>Total cost</span>
              <span className="font-bold text-zinc-900 font-mono">€775</span>
            </div>
          </div>

          {/* Checklist Section (Matching Screenshot 5!) */}
          <div className="border-t border-zinc-100 pt-3 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-900">
              <span>Checklist</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full bg-zinc-200 overflow-hidden">
                  <div
                    className="h-full bg-zinc-900 rounded-full"
                    style={{
                      width: `${
                        (selectedTask.checklist.filter((c) => c.completed).length /
                          Math.max(1, selectedTask.checklist.length)) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <span className="font-mono text-zinc-500 text-xs">
                  {selectedTask.checklist.filter((c) => c.completed).length}/
                  {selectedTask.checklist.length}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              {selectedTask.checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2.5 text-xs text-zinc-800 cursor-pointer p-1 rounded-lg hover:bg-zinc-50"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleChecklistItem(selectedTask.id, item.id)}
                    className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-0 cursor-pointer"
                  />
                  <span className={item.completed ? 'line-through text-zinc-400' : 'font-medium'}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>

            {/* Quick Add Subtask */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newChecklistText}
                onChange={(e) => setNewChecklistText(e.target.value)}
                placeholder="+ Add subtask..."
                className="flex-1 px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs outline-none focus:border-black"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newChecklistText.trim()) {
                    useRuneyStore.setState((s) => ({
                      tasks: s.tasks.map((t) =>
                        t.id === selectedTask.id
                          ? {
                              ...t,
                              checklist: [
                                ...t.checklist,
                                { id: `c-${Date.now()}`, text: newChecklistText, completed: false },
                              ],
                            }
                          : t
                      ),
                      selectedTask: {
                        ...selectedTask,
                        checklist: [
                          ...selectedTask.checklist,
                          { id: `c-${Date.now()}`, text: newChecklistText, completed: false },
                        ],
                      },
                    }));
                    setNewChecklistText('');
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
