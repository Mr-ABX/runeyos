import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Receipt,
  Plus,
  ArrowUpRight,
  Eye,
  ChevronDown,
} from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';

export const RuneyDashboard: React.FC = () => {
  const { setCurrentTab, invoices } = useRuneyStore();

  return (
    <div className="space-y-5 pb-20 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Good morning, Solt
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Here&apos;s an overview of your business performance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-runey-sm cursor-pointer hover:bg-zinc-50">
            <span>Last 30 Days</span>
            <ChevronDown size={14} className="text-zinc-400" />
          </div>
        </div>
      </div>

      {/* 4 Metric Cards + Signature Green Cashflow Card */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Metric 1: Revenue */}
        <div className="runey-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Revenue</span>
            <span className="runey-tag bg-emerald-50 text-emerald-700 border border-emerald-100">
              ↗ 24%
            </span>
          </div>
          <div className="mt-2">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">€110.8k</h2>
            <p className="text-[11px] text-zinc-400">Selected period</p>
          </div>
          {/* Sparkline */}
          <div className="h-6 w-full mt-2">
            <svg className="w-full h-full text-zinc-300 stroke-current fill-none" viewBox="0 0 100 25">
              <path d="M0,20 Q15,18 30,12 T60,8 T80,18 T100,5" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Metric 2: Open */}
        <div className="runey-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Open</span>
            <span className="runey-tag bg-rose-50 text-rose-700 border border-rose-100">
              ↗ 40%
            </span>
          </div>
          <div className="mt-2">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">€24.8k</h2>
            <p className="text-[11px] text-zinc-400">39 invoices</p>
          </div>
          {/* Sparkline */}
          <div className="h-6 w-full mt-2">
            <svg className="w-full h-full text-zinc-300 stroke-current fill-none" viewBox="0 0 100 25">
              <path d="M0,15 Q20,22 40,10 T70,18 T100,8" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Metric 3: Paid */}
        <div className="runey-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Paid</span>
            <span className="runey-tag bg-rose-50 text-rose-700 border border-rose-100">
              ↘ 59%
            </span>
          </div>
          <div className="mt-2">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">€24.3k</h2>
            <p className="text-[11px] text-zinc-400">11 invoices</p>
          </div>
          {/* Sparkline */}
          <div className="h-6 w-full mt-2">
            <svg className="w-full h-full text-zinc-300 stroke-current fill-none" viewBox="0 0 100 25">
              <path d="M0,18 Q30,5 60,20 T100,10" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Metric 4: Overdue */}
        <div className="runey-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Overdue</span>
            <span className="runey-tag bg-emerald-50 text-emerald-700 border border-emerald-100">
              ↗ 100%
            </span>
          </div>
          <div className="mt-2">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">€0</h2>
            <p className="text-[11px] text-zinc-400">0 invoices</p>
          </div>
          {/* Flat line */}
          <div className="h-6 w-full mt-2">
            <svg className="w-full h-full text-zinc-300 stroke-current fill-none" viewBox="0 0 100 25">
              <line x1="0" y1="20" x2="100" y2="20" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Signature Green Fluid Cashflow Card (Matching Screenshot 3!) */}
        <div className="relative rounded-[22px] p-5 text-white overflow-hidden shadow-runey-lg flex flex-col justify-between min-h-[140px] bg-[#0c140e]">
          {/* Green abstract fluid wave background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-green-900 to-lime-600 opacity-80 mix-blend-screen" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/30 rounded-full blur-2xl" />

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-emerald-200">Solt Wagner</p>
              <h3 className="text-2xl font-black tracking-tight mt-0.5">€82.6k</h3>
              <p className="text-[10px] text-emerald-200/80">Total cashflow</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <span className="text-[10px] font-bold">⬡</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 mt-3">
            <button
              onClick={() => setCurrentTab('invoices')}
              className="flex-1 py-1.5 px-3 bg-white text-black hover:bg-zinc-100 rounded-full text-[11px] font-bold shadow-sm transition-all flex items-center justify-center gap-1 active:scale-95"
            >
              <Receipt size={12} />
              <span>New Invoice</span>
            </button>
            <button
              onClick={() => setCurrentTab('expenses')}
              className="py-1.5 px-3 bg-black/40 hover:bg-black/60 text-white rounded-full text-[11px] font-semibold backdrop-blur-sm border border-white/20 transition-all flex items-center justify-center gap-1 active:scale-95"
            >
              <Plus size={12} />
              <span>New Expense</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Cashflow Timeline Balance Chart + Activities Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Balance & Timeline Graph */}
        <div className="lg:col-span-2 runey-card p-5 flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
            <div>
              <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Balance</span>
              <div className="flex items-center gap-2 mt-0.5">
                <h3 className="text-2xl font-black text-zinc-900">€23.2k</h3>
                <span className="runey-tag bg-rose-50 text-rose-700 text-[10px]">↘ 61%</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Paid 11</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span>Invoiced 39</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                <span>Quoted 8</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Expenses 11</span>
              </span>
            </div>
          </div>

          {/* Timeline Chart Illustration with Floating Avatars */}
          <div className="relative h-56 w-full pt-4 flex items-end justify-between px-2">
            {/* Background smooth curve */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 500 150">
              <path
                d="M 0 120 Q 100 115 150 60 T 300 60 T 500 60 L 500 150 L 0 150 Z"
                fill="rgba(16, 185, 129, 0.08)"
              />
              <path
                d="M 0 120 Q 100 115 150 60 T 300 60 T 500 60"
                stroke="#10b981"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>

            {/* Bar Pillars on Dates with Vendor/Client Avatars */}
            {[
              { day: 'Apr 5', height: 'h-10', bg: 'bg-zinc-800', avatar: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
              { day: 'Apr 6', height: 'h-14', bg: 'bg-rose-500', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60' },
              { day: 'Apr 8', height: 'h-20', bg: 'bg-zinc-800', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60' },
              { day: 'Apr 9', height: 'h-12', bg: 'bg-emerald-500', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60' },
              { day: 'Apr 14', height: 'h-40', bg: 'bg-zinc-800', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60' },
              { day: 'Apr 16', height: 'h-28', bg: 'bg-rose-500', avatar: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg' },
              { day: 'Apr 18', height: 'h-36', bg: 'bg-zinc-800', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60' },
              { day: 'Apr 20', height: 'h-32', bg: 'bg-zinc-800', avatar: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
              { day: 'Apr 24', height: 'h-44', bg: 'bg-rose-500', avatar: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg' },
              { day: 'Apr 28', height: 'h-24', bg: 'bg-rose-500', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60' },
              { day: 'Apr 30', height: 'h-36', bg: 'bg-rose-500', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60' },
              { day: 'May 4', height: 'h-8', bg: 'bg-zinc-300' },
            ].map((col, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 z-10">
                {col.avatar && (
                  <img
                    src={col.avatar}
                    alt="avatar"
                    className="w-4 h-4 rounded-full border border-white shadow-xs object-cover"
                  />
                )}
                <div className={`w-2.5 ${col.height} ${col.bg} rounded-full transition-all`} />
                <span className="text-[10px] text-zinc-400 font-medium">{col.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Activities Feed (Matching Screenshot 3!) */}
        <div className="runey-card p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <h3 className="text-sm font-bold text-zinc-900">Activities</h3>
              <span className="text-[11px] text-zinc-400">Latest updates</span>
            </div>

            <div className="space-y-3 pt-3">
              {[
                { name: 'Someone', action: 'viewed invoice', code: 'RNY-04092026-0007', time: '44 minutes ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50' },
                { name: 'Someone', action: 'viewed invoice', code: 'RNY-04092026-0001', time: 'about 6 hours ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
                { name: 'Someone', action: 'viewed invoice', code: 'RNY-04092026-0008', time: 'about 9 hours ago', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50' },
                { name: 'Sofia Andersson', action: 'viewed invoice', code: 'RNY-04092026-0003', time: 'about 20 hours ago', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50' },
                { name: 'Sofia Andersson', action: 'signed agreement', code: 'MSA-NordicWave', time: '1 day ago', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs">
                  <img src={item.avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5" />
                  <div className="flex-1 truncate">
                    <p className="text-zinc-800 leading-snug">
                      <strong className="text-zinc-900 font-semibold">{item.name}</strong> {item.action}{' '}
                      <span className="font-mono text-zinc-500 font-semibold">{item.code}</span>
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentTab('invoices')}
            className="w-full py-2 text-center text-xs font-semibold text-zinc-600 hover:text-black border-t border-zinc-100 pt-2"
          >
            View All 39 Invoices →
          </button>
        </div>
      </div>

      {/* Bottom Health & Margin Stats Bar (Matching Screenshot 3!) */}
      <div className="runey-card p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-semibold">
            <span>Net Revenue</span>
            <span className="text-emerald-600">↗ 13%</span>
          </div>
          <p className="text-lg font-bold text-zinc-900 mt-0.5">€95.9k</p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-semibold">
            <span>VAT</span>
            <span className="text-emerald-600">↗ 246%</span>
          </div>
          <p className="text-lg font-bold text-zinc-900 mt-0.5">€14.9k</p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-semibold">
            <span>Expenses</span>
            <span className="text-rose-600">↗ 181%</span>
          </div>
          <p className="text-lg font-bold text-zinc-900 mt-0.5">€1.2k</p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-semibold">
            <span>Profit</span>
            <span className="text-emerald-600">↗ 12%</span>
          </div>
          <p className="text-lg font-bold text-zinc-900 mt-0.5">€94.8k</p>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <span className="text-[11px] text-zinc-500 font-semibold block">Margin</span>
            <p className="text-lg font-bold text-zinc-900">99%</p>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold text-emerald-600">
            ✓
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <span className="text-[11px] text-zinc-500 font-semibold block">Business Health</span>
            <p className="text-lg font-bold text-zinc-900">Low</p>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-rose-500 flex items-center justify-center text-[10px] font-bold text-rose-600">
            22
          </div>
        </div>
      </div>
    </div>
  );
};
