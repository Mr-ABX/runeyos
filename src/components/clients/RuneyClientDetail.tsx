import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  MoreHorizontal,
  Plus,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
  ExternalLink,
  DollarSign,
  Folder,
  Clock,
} from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';

export const RuneyClientDetail: React.FC = () => {
  const { selectedClient, setCurrentTab } = useRuneyStore();
  const [calendarViewMode, setCalendarViewMode] = useState<'timeline' | 'week' | 'month'>('timeline');

  return (
    <div className="space-y-5 pb-24 max-w-7xl mx-auto">
      {/* 1. Client Header Info Card */}
      <div className="runey-card p-6 space-y-4 shadow-runey-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={selectedClient.avatar}
              alt={selectedClient.name}
              className="w-16 h-16 rounded-2xl object-cover border border-zinc-200 shadow-sm"
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
                {selectedClient.name}
              </h1>
              <p className="text-sm font-semibold text-zinc-500">{selectedClient.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="runey-tag bg-emerald-50 text-emerald-700 border border-emerald-100">
              ● Active
            </span>
            <button className="w-8 h-8 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center transition-colors">
              <MoreHorizontal size={15} />
            </button>
            <button
              onClick={() => setCurrentTab('invoices')}
              className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Plus size={13} />
              <span>New</span>
            </button>
          </div>
        </div>

        {/* Contact Links Row */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-zinc-100 text-xs text-zinc-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Mail size={13} className="text-zinc-400" />
            <span className="text-zinc-700">{selectedClient.email}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Phone size={13} className="text-zinc-400" />
            <span className="text-zinc-700">{selectedClient.phone}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Globe size={13} className="text-zinc-400" />
            <span className="text-zinc-700">{selectedClient.website}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-zinc-400" />
            <span className="text-zinc-700 truncate max-w-xs">{selectedClient.address}</span>
          </span>
        </div>
      </div>

      {/* 2. 5 KPI Cards (Matching Screenshot 4!) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Billed */}
        <div className="runey-card p-4 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold">Total Billed</span>
            <DollarSign size={14} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">€{(selectedClient.totalBilled / 1000).toFixed(1)}k</h3>
            <div className="w-full h-1 bg-black rounded-full mt-2" />
            <p className="text-[10px] text-zinc-400 font-semibold mt-1">100%</p>
          </div>
        </div>

        {/* Card 2: Collected */}
        <div className="runey-card p-4 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold">Collected</span>
            <span className="text-xs">✓</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">€{(selectedClient.collected / 1000).toFixed(1)}k</h3>
            <p className="text-[10px] text-zinc-400 font-semibold mt-3">1 paid</p>
          </div>
        </div>

        {/* Card 3: Outstanding */}
        <div className="runey-card p-4 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold">Outstanding</span>
            <Clock size={14} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">€{selectedClient.outstanding}</h3>
            <p className="text-[10px] text-zinc-400 font-semibold mt-3">0 pending, 0 overdue</p>
          </div>
        </div>

        {/* Card 4: Projects */}
        <div className="runey-card p-4 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold">Projects</span>
            <Folder size={14} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">{selectedClient.projectsCount}</h3>
            <p className="text-[10px] text-zinc-400 font-semibold mt-3">Linked to customer</p>
          </div>
        </div>

        {/* Card 5: Documents */}
        <div className="runey-card p-4 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold">Documents</span>
            <FileText size={14} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900">{selectedClient.documentsCount}</h3>
            <p className="text-[10px] text-zinc-400 font-semibold mt-3">1 proposal</p>
          </div>
        </div>
      </div>

      {/* 3. Horizontal Activity Calendar (Matching Screenshot 4 EXACTLY!) */}
      <div className="runey-card p-5 space-y-4 shadow-runey-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-zinc-900">Activity calendar</h2>
            <p className="text-[11px] text-zinc-400">{selectedClient.timelineEvents.length} events on record</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-zinc-100 p-0.5 rounded-full border border-zinc-200 text-xs">
              <button
                onClick={() => setCalendarViewMode('timeline')}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  calendarViewMode === 'timeline' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setCalendarViewMode('week')}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  calendarViewMode === 'week' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setCalendarViewMode('month')}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  calendarViewMode === 'month' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'
                }`}
              >
                Month
              </button>
            </div>

            <button className="px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-50">
              Today
            </button>
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-black">
                <ChevronLeft size={12} />
              </button>
              <button className="w-6 h-6 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-black">
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* The Horizontal Timeline Date Axis with Event Branching Pills */}
        <div className="relative pt-4 pb-12 overflow-x-auto custom-scrollbar">
          {/* Timeline Date Header Line */}
          <div className="flex items-center justify-between min-w-[700px] border-b border-zinc-200 pb-2 text-[10px] text-zinc-400 font-mono">
            <span className="font-bold text-zinc-700">Mar</span>
            {Array.from({ length: 18 }).map((_, i) => {
              const day = 17 + i;
              const isEventDay = [20, 24, 28, 2, 10, 18, 29].includes(day % 31);
              return (
                <span
                  key={i}
                  className={`w-6 text-center ${
                    isEventDay ? 'font-bold text-zinc-900' : 'text-zinc-400'
                  }`}
                >
                  {day > 31 ? day - 31 : day}
                </span>
              );
            })}
            <span className="font-bold text-zinc-700">May</span>
          </div>

          {/* Branching Event Pills Stack */}
          <div className="space-y-3 pt-4 min-w-[700px]">
            {/* Event 1: INV-004 sent (Blue Pill) */}
            <div className="flex items-center pl-16">
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                <FileText size={12} />
                <span>INV-004 sent</span>
                <span className="font-mono font-bold">€8,500</span>
              </div>
            </div>

            {/* Event 2: Customer added (Black Pill) */}
            <div className="flex items-center pl-44">
              <div className="flex items-center gap-2 bg-zinc-900 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                <span className="text-[11px]">👤</span>
                <span>Customer added</span>
              </div>
            </div>

            {/* Event 3: Annual Maintenance (Red Pill) & Project Started (Dark Pill) */}
            <div className="flex items-center pl-28 gap-3">
              <div className="flex items-center gap-2 bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                <span className="text-[11px]">🤝</span>
                <span>Annual Maintenance</span>
                <span className="font-mono font-bold">€14,400</span>
              </div>

              <div className="flex items-center gap-2 bg-zinc-900 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                <Folder size={12} />
                <span>Marketing Website started</span>
              </div>
            </div>

            {/* Event 4: INV-004 paid (Green Pill) */}
            <div className="flex items-center pl-48">
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                <span className="text-[11px] font-bold">$</span>
                <span>INV-004 paid</span>
                <span className="font-mono font-bold">€8,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Documents Table & Activity Stream (Matching Screenshot 4!) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Documents Table */}
        <div className="runey-card p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Documents</h3>
              <p className="text-[11px] text-zinc-400">Latest 2 of 2</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button className="flex items-center gap-1 bg-zinc-100 px-2.5 py-1 rounded-lg text-zinc-600 font-medium">
                <span>All</span>
              </button>
              <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-lg">
                <Search size={12} className="text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-xs outline-none w-20"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText size={15} />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">INV-004</p>
                  <p className="text-[11px] text-zinc-400">Marketing Website</p>
                </div>
              </div>
              <span className="runey-tag bg-emerald-50 text-emerald-700">Paid €8,500</span>
            </div>
          </div>
        </div>

        {/* Activity Stream */}
        <div className="runey-card p-5 space-y-3">
          <div className="border-b border-zinc-100 pb-2">
            <h3 className="text-sm font-bold text-zinc-900">Activity</h3>
            <p className="text-[11px] text-zinc-400">Latest events</p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs">
              <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700">
                <Folder size={14} />
              </div>
              <div>
                <p className="text-zinc-800">
                  Project <strong className="text-zinc-900">Marketing Website</strong> was started
                </p>
                <p className="text-[10px] text-zinc-400">1 month ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
