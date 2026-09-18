import React, { useState } from 'react';
import { Search, Bell, ArrowLeft, Check, Clock } from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';

interface TopNavProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const RuneyTopNav: React.FC<TopNavProps> = ({ showBack, onBack }) => {
  const { setQuickSearchOpen, timer, pauseTimer, startTimer } = useRuneyStore();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between w-full h-12 mb-4">
      {/* Left Back Arrow (if in detail view) */}
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center transition-colors shadow-sm"
            title="Go Back"
          >
            <ArrowLeft size={16} />
          </button>
        )}
      </div>

      {/* Right Controls: Timer Pill, Search, Notification Bell, User Avatar */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Floating Top Right Timer (Matching Screenshot 5!) */}
        {timer.seconds > 0 && (
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-zinc-200/90 shadow-sm">
            <span className="font-mono text-xs font-bold text-zinc-900 tracking-wider">
              {formatTimer(timer.seconds)}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => (timer.isRunning ? pauseTimer() : startTimer())}
                className="w-5 h-5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center transition-colors text-[10px]"
                title={timer.isRunning ? 'Pause Timer' : 'Resume Timer'}
              >
                {timer.isRunning ? '❚❚' : '▶'}
              </button>
              <button
                onClick={pauseTimer}
                className="w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-xs"
                title="Stop Timer"
              >
                <div className="w-2 h-2 rounded-[2px] bg-white" />
              </button>
            </div>
          </div>
        )}

        {/* Search Trigger */}
        <button
          onClick={() => setQuickSearchOpen(true)}
          className="w-8 h-8 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 flex items-center justify-center transition-colors shadow-sm"
          title="Search anything (Cmd + K)"
        >
          <Search size={15} />
        </button>

        {/* Notification Bell with Badge 4 (Matching Screenshot 1 & 3!) */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="w-8 h-8 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 flex items-center justify-center transition-colors shadow-sm relative"
            title="Notifications"
          >
            <Bell size={15} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
              4
            </span>
          </button>

          {/* Notification Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl p-4 shadow-runey-lg border border-zinc-200 z-50 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <span className="text-xs font-bold text-zinc-900">Notifications</span>
                <span className="text-[10px] text-zinc-400 font-semibold">4 unread</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100 space-y-0.5">
                  <p className="font-semibold text-zinc-900">Sofia Andersson viewed invoice</p>
                  <p className="text-[10px] text-zinc-400 font-mono">RNY-04092026-0003 • 20 hours ago</p>
                </div>
                <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100 space-y-0.5">
                  <p className="font-semibold text-zinc-900">Invoice INV-004 marked as PAID</p>
                  <p className="text-[10px] text-emerald-600 font-mono">€8,500 deposited via Stripe</p>
                </div>
                <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100 space-y-0.5">
                  <p className="font-semibold text-zinc-900">New Client Onboarding Completed</p>
                  <p className="text-[10px] text-zinc-400 font-mono">PixelVault Inc. • Signed MSA</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Solt Wagner"
            className="w-8 h-8 rounded-full border border-zinc-200 object-cover shadow-sm cursor-pointer hover:ring-2 hover:ring-black transition-all"
            title="Solt Wagner (Owner)"
          />
        </div>
      </div>
    </div>
  );
};
