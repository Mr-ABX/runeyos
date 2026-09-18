'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Receipt, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { useRuneyStore } from '@/lib/store';

export const TimeTrackingView: React.FC = () => {
  const { timeEntries, setActiveTab, showToast } = useRuneyStore();
  const [filterBilled, setFilterBilled] = useState<'all' | 'unbilled' | 'billed'>('all');

  const filteredEntries = timeEntries.filter((entry) => {
    if (filterBilled === 'unbilled') return !entry.isBilled;
    if (filterBilled === 'billed') return entry.isBilled;
    return true;
  });

  const totalUnbilledAmount = timeEntries
    .filter((t) => !t.isBilled)
    .reduce((acc, t) => acc + (t.durationSeconds / 3600) * t.hourlyRate, 0);

  const totalHours = (timeEntries.reduce((acc, t) => acc + t.durationSeconds, 0) / 3600).toFixed(1);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Timesheets & Billable Hours</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {totalHours} total hours logged
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Accurate, second-by-second ambient time tracking ready for 1-click invoice conversion.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('invoices')}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Receipt size={14} />
          <span>Convert Unbilled to Invoice (${totalUnbilledAmount.toFixed(0)})</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterBilled('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filterBilled === 'all'
              ? 'bg-white/10 text-white border border-white/15'
              : 'text-zinc-400 hover:text-white bg-transparent'
          }`}
        >
          All Entries ({timeEntries.length})
        </button>
        <button
          onClick={() => setFilterBilled('unbilled')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filterBilled === 'unbilled'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'text-zinc-400 hover:text-white bg-transparent'
          }`}
        >
          Unbilled Only ({timeEntries.filter((t) => !t.isBilled).length})
        </button>
        <button
          onClick={() => setFilterBilled('billed')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filterBilled === 'billed'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-zinc-400 hover:text-white bg-transparent'
          }`}
        >
          Billed ({timeEntries.filter((t) => t.isBilled).length})
        </button>
      </div>

      {/* Timesheet List */}
      <div className="glass-panel rounded-3xl p-4 border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                <th className="pb-3 px-3">Project & Task</th>
                <th className="pb-3 px-3">Client</th>
                <th className="pb-3 px-3">Description</th>
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3 text-center">Duration</th>
                <th className="pb-3 px-3 text-right">Billable Total</th>
                <th className="pb-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-zinc-200">
              {filteredEntries.map((entry) => {
                const hours = (entry.durationSeconds / 3600).toFixed(2);
                const amount = (Number(hours) * entry.hourlyRate).toFixed(2);

                return (
                  <tr key={entry.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-white">{entry.projectName}</p>
                      {entry.taskTitle && (
                        <p className="text-[11px] text-zinc-400">{entry.taskTitle}</p>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-zinc-300">{entry.clientName}</td>
                    <td className="py-3.5 px-3 text-zinc-400 max-w-xs truncate">{entry.description}</td>
                    <td className="py-3.5 px-3 font-mono text-zinc-400">
                      {entry.startTime.split('T')[0]}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-white text-center">
                      {hours} hrs
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-cyan-300 text-right">
                      ${amount}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          entry.isBilled
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        }`}
                      >
                        {entry.isBilled ? 'Billed' : 'Unbilled'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
