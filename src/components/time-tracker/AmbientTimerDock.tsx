'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, RotateCcw, Clock, ChevronUp, ChevronDown, Receipt, Check } from 'lucide-react';
import { useRuneyStore } from '@/lib/store';

export const AmbientTimerDock: React.FC = () => {
  const {
    timer,
    startTimer,
    stopTimer,
    resetTimer,
    tickTimer,
    setTimerDescription,
    projects,
    clients,
    activeTab,
    setActiveTab,
  } = useRuneyStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(timer.projectId || projects[0]?.id || '');
  const [selectedClientId, setSelectedClientId] = useState(timer.clientId || clients[0]?.id || '');
  const [hourlyRate, setHourlyRate] = useState(150);

  // Tick timer every second when running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer.isRunning) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer.isRunning, tickTimer]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleToggleTimer = () => {
    if (timer.isRunning) {
      stopTimer();
    } else {
      const selectedProj = projects.find((p) => p.id === selectedProjectId);
      const selectedClient = clients.find((c) => c.id === selectedClientId);

      startTimer({
        projectId: selectedProjectId,
        clientId: selectedClientId,
        description: timer.description || 'Sprint Task Execution',
        hourlyRate: selectedProj?.hourlyRate || selectedClient?.defaultHourlyRate || hourlyRate,
      });
    }
  };

  const currentEarned = ((timer.seconds / 3600) * (timer.hourlyRate || 150)).toFixed(2);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Controls Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="mb-3 w-80 glass-panel rounded-3xl p-4 border border-white/15 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-cyan-400">
                <Clock size={16} />
                <span className="text-xs font-bold text-white tracking-tight">Ambient Time Tracker</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                ${timer.hourlyRate || 150}/hr
              </span>
            </div>

            {/* Description input */}
            <div>
              <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
                Task Description
              </label>
              <input
                type="text"
                value={timer.description}
                onChange={(e) => setTimerDescription(e.target.value)}
                placeholder="What are you working on?"
                className="w-full text-xs px-3 py-2 rounded-xl glass-input"
              />
            </div>

            {/* Project & Client Selector */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
                  Project
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-xl glass-input"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id} className="bg-zinc-900 text-white">
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
                  Client
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-xl glass-input"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id} className="bg-zinc-900 text-white">
                      {c.company}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Earned Badge */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5">
              <span className="text-xs text-zinc-400">Current Session:</span>
              <span className="text-xs font-bold text-cyan-300 font-mono">${currentEarned} USD</span>
            </div>

            {/* Quick Link to Timesheet */}
            <button
              onClick={() => {
                setActiveTab('time');
                setIsExpanded(false);
              }}
              className="w-full py-1.5 text-center text-xs font-medium text-indigo-300 hover:text-indigo-200 hover:underline transition-colors flex items-center justify-center gap-1"
            >
              <Receipt size={12} />
              <span>View Unbilled Timesheet</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Timer Bar */}
      <motion.div
        layout
        className="glass-pill px-4 py-2.5 flex items-center gap-3.5 border border-white/15 shadow-2xl cursor-pointer hover:border-white/25 transition-all"
      >
        {/* Glowing Record Indicator */}
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              timer.isRunning
                ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] animate-pulse'
                : 'bg-zinc-600'
            }`}
          />
          <span className="font-mono text-sm font-bold text-white tracking-wider">
            {formatTime(timer.seconds)}
          </span>
        </div>

        {/* Start / Stop Button */}
        <button
          onClick={handleToggleTimer}
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 ${
            timer.isRunning
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30'
          }`}
          title={timer.isRunning ? 'Stop & Log Time' : 'Start Timer'}
        >
          {timer.isRunning ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
        </button>

        {/* Reset Button (only if not running and has time) */}
        {!timer.isRunning && timer.seconds > 0 && (
          <button
            onClick={resetTimer}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 flex items-center justify-center transition-colors"
            title="Reset Counter"
          >
            <RotateCcw size={12} />
          </button>
        )}

        {/* Expand / Collapse Toggle Chevron */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </motion.div>
    </div>
  );
};
