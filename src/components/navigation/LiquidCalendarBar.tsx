'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { format, addDays, subDays, isSameDay, isToday } from 'date-fns';
import { useRuneyStore } from '@/lib/store';

export const LiquidCalendarBar: React.FC = () => {
  const { selectedDate, setSelectedDate, tasks, invoices } = useRuneyStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate 28 days around current reference date (2026-09-18)
  const baseDate = new Date(2026, 8, 18); // Sep 18, 2026
  const days = Array.from({ length: 28 }).map((_, i) => {
    return addDays(subDays(baseDate, 7), i);
  });

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelectToday = () => {
    const todayStr = '2026-09-18';
    setSelectedDate(todayStr);
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-3 flex flex-col md:flex-row items-center justify-between gap-3 border border-white/10 shadow-xl relative overflow-hidden">
      {/* Left controls: Month header & Today button */}
      <div className="flex items-center justify-between w-full md:w-auto gap-3 shrink-0 px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-sm">
            <CalendarIcon size={16} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-tight">September 2026</h3>
            <p className="text-[10px] text-zinc-400">Q3 Project Sprint</p>
          </div>
        </div>

        <button
          onClick={handleSelectToday}
          className="px-2.5 py-1 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-white text-[11px] font-semibold border border-indigo-500/30 transition-all flex items-center gap-1 active:scale-95"
        >
          <Sparkles size={11} />
          <span>Today</span>
        </button>
      </div>

      {/* Date Carousel Container */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center">
        {/* Scroll Left Button */}
        <button
          onClick={() => handleScroll('left')}
          className="hidden sm:flex absolute left-0 z-10 w-7 h-7 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/15 text-zinc-400 hover:text-white items-center justify-center shadow-lg transition-colors"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Scrollable Date Strip */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto custom-scrollbar py-1 px-4 sm:px-8 w-full scroll-smooth"
        >
          {days.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const isSelected = selectedDate === dateStr;
            const isCurrentDay = isToday(day) || dateStr === '2026-09-18';
            const dayName = format(day, 'EEE');
            const dayNum = format(day, 'd');

            // Check for tasks due on this date
            const hasTaskDue = tasks.some((t) => t.dueDate === dateStr);
            const hasInvoiceDue = invoices.some((inv) => inv.dueDate === dateStr);

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`group relative flex flex-col items-center justify-center min-w-[52px] h-[64px] rounded-2xl p-1.5 transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'glass-pill-cyan scale-105 text-white shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                    : isCurrentDay
                    ? 'bg-white/10 text-zinc-200 border border-white/20'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-zinc-200 border border-white/5'
                }`}
              >
                <span className="text-[10px] font-medium tracking-wider uppercase opacity-80">
                  {dayName}
                </span>
                <span className={`text-sm font-bold mt-0.5 ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                  {dayNum}
                </span>

                {/* Micro indicators for deadline dots */}
                <div className="flex items-center gap-1 mt-1">
                  {hasTaskDue && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_4px_rgba(167,139,250,0.8)]"
                      title="Task due on this day"
                    />
                  )}
                  {hasInvoiceDue && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]"
                      title="Invoice payment due"
                    />
                  )}
                  {!hasTaskDue && !hasInvoiceDue && (
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => handleScroll('right')}
          className="hidden sm:flex absolute right-0 z-10 w-7 h-7 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/15 text-zinc-400 hover:text-white items-center justify-center shadow-lg transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
