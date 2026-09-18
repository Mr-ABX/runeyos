import React, { useState } from 'react';
import {
  Plus,
  ChevronDown,
  SlidersHorizontal,
  Search,
  LayoutGrid,
  List as ListIcon,
  MoreHorizontal,
} from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';

export const RuneyExpenses: React.FC = () => {
  const { expenses, addExpense } = useRuneyStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [vendor, setVendor] = useState('');
  const [category, setCategory] = useState('Software');
  const [amount, setAmount] = useState(99);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addExpense({
      title,
      vendor: vendor || 'Vendor',
      category,
      paymentMethod: 'Card',
      date: 'May 1, 2026',
      dayLabel: 'May 1',
      amount: Number(amount),
      vendorLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    });

    setTitle('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5 pb-24 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Expenses</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Track spending, vendors and categories across your business.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-runey-sm">
            <span>Last 30 Days</span>
            <ChevronDown size={14} className="text-zinc-400" />
          </div>

          <button className="w-8 h-8 rounded-full bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center shadow-runey-sm hover:bg-zinc-50">
            <SlidersHorizontal size={14} />
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 active:scale-95"
          >
            <Plus size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Metric Cards (Matching Screenshot 2!) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="runey-card p-4 space-y-1">
          <span className="text-xs font-semibold text-zinc-500">Expenses</span>
          <div className="flex items-center justify-between pt-1">
            <h3 className="text-2xl font-bold text-zinc-900">11</h3>
            <span className="runey-tag bg-rose-50 text-rose-700">+267%</span>
          </div>
          <p className="text-[11px] text-zinc-400">expenses</p>
        </div>

        <div className="runey-card p-4 space-y-1">
          <span className="text-xs font-semibold text-zinc-500">Total Spent</span>
          <div className="flex items-center justify-between pt-1">
            <h3 className="text-2xl font-bold text-zinc-900">€1,152.6</h3>
            <span className="runey-tag bg-rose-50 text-rose-700">+181%</span>
          </div>
          <p className="text-[11px] text-zinc-400">11 expenses</p>
        </div>

        <div className="runey-card p-4 space-y-1">
          <span className="text-xs font-semibold text-zinc-500">Avg. Daily</span>
          <div className="flex items-center justify-between pt-1">
            <h3 className="text-2xl font-bold text-zinc-900">€38</h3>
            <span className="runey-tag bg-rose-50 text-rose-700">+181%</span>
          </div>
          <p className="text-[11px] text-zinc-400">per day</p>
        </div>

        <div className="runey-card p-4 space-y-1">
          <span className="text-xs font-semibold text-zinc-500">Categories</span>
          <div className="flex items-center justify-between pt-1">
            <h3 className="text-2xl font-bold text-zinc-900">7</h3>
          </div>
          <p className="text-[11px] text-zinc-400">active</p>
        </div>
      </div>

      {/* 3. Spending Overview Bar Chart (Matching Screenshot 2 EXACTLY!) */}
      <div className="runey-card p-5 space-y-4 shadow-runey-card">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Spending overview</h3>
            <p className="text-[11px] text-zinc-400">Expenses over the selected range.</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Spent</span>
          </div>
        </div>

        {/* The Bar Chart with Vendor Logos at the Top of Bars */}
        <div className="relative h-56 w-full pt-8 flex items-end justify-between px-2 overflow-x-auto custom-scrollbar">
          {[
            { day: 'Apr 5', height: 'h-0', logo: null },
            { day: 'Apr 6', height: 'h-10', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
            { day: 'Apr 7', height: 'h-0', logo: null },
            { day: 'Apr 8', height: 'h-12', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
            { day: 'Apr 9', height: 'h-0', logo: null },
            { day: 'Apr 10', height: 'h-0', logo: null },
            { day: 'Apr 11', height: 'h-0', logo: null },
            { day: 'Apr 12', height: 'h-0', logo: null },
            { day: 'Apr 13', height: 'h-24', logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50' },
            { day: 'Apr 14', height: 'h-0', logo: null },
            { day: 'Apr 15', height: 'h-0', logo: null },
            { day: 'Apr 16', height: 'h-0', logo: null },
            { day: 'Apr 17', height: 'h-28', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { day: 'Apr 18', height: 'h-0', logo: null },
            { day: 'Apr 19', height: 'h-0', logo: null },
            { day: 'Apr 20', height: 'h-0', logo: null },
            { day: 'Apr 21', height: 'h-14', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg' },
            { day: 'Apr 22', height: 'h-0', logo: null },
            { day: 'Apr 23', height: 'h-0', logo: null },
            { day: 'Apr 24', height: 'h-48', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { day: 'Apr 25', height: 'h-0', logo: null },
            { day: 'Apr 26', height: 'h-0', logo: null },
            { day: 'Apr 27', height: 'h-18', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg' },
            { day: 'Apr 28', height: 'h-12', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg' },
            { day: 'Apr 29', height: 'h-0', logo: null },
            { day: 'Apr 30', height: 'h-40', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg' },
            { day: 'May 1', height: 'h-16', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
            { day: 'May 2', height: 'h-0', logo: null },
            { day: 'May 3', height: 'h-0', logo: null },
            { day: 'May 4', height: 'h-0', logo: null },
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[28px]">
              {bar.logo ? (
                <img
                  src={bar.logo}
                  alt="logo"
                  className="w-4 h-4 rounded-full border border-white shadow-xs object-cover"
                />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
              )}
              <div
                className={`w-2.5 ${bar.height} bg-gradient-to-t from-rose-500 to-rose-400 rounded-full transition-all`}
              />
              <span className="text-[9px] text-zinc-400 font-medium whitespace-nowrap">
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. All Expenses Table Feed (Matching Screenshot 2!) */}
      <div className="runey-card p-5 space-y-4 shadow-runey-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">All expenses</h3>
            <p className="text-[11px] text-zinc-400">{expenses.length} shown</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-700">
              <span>Newest first</span>
              <ChevronDown size={13} className="text-zinc-400" />
            </div>

            <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-700">
              <span>All categories</span>
              <ChevronDown size={13} className="text-zinc-400" />
            </div>

            <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-full border border-zinc-200">
              <button className="p-1 rounded-full bg-white shadow-xs text-zinc-900">
                <ListIcon size={13} />
              </button>
              <button className="p-1 rounded-full text-zinc-500 hover:text-black">
                <LayoutGrid size={13} />
              </button>
            </div>

            <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-full text-xs">
              <Search size={13} className="text-zinc-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-xs outline-none w-24"
              />
            </div>
          </div>
        </div>

        {/* Group: May 2026 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
            <span>May 2026 1</span>
            <span className="font-mono text-zinc-700">-€99</span>
          </div>

          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center p-1.5 shadow-xs">
                  <img src={exp.vendorLogo} alt={exp.vendor} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">{exp.title}</h4>
                  <p className="text-[11px] text-zinc-400">{exp.vendor} · {exp.paymentMethod}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="text-zinc-400 font-mono">{exp.date}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-200 text-zinc-700">
                  {exp.category}
                </span>
                <span className="font-mono font-bold text-zinc-900">-€{exp.amount.toFixed(2)}</span>
                <button className="w-6 h-6 rounded-full hover:bg-zinc-200 text-zinc-400 hover:text-black flex items-center justify-center">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-zinc-200 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-900">Add New Expense</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-6 h-6 rounded-full hover:bg-zinc-100 text-zinc-400"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-500 font-semibold block mb-1">Expense Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Adobe Suite Subscription"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-500 font-semibold block mb-1">Vendor</label>
                  <input
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    placeholder="Adobe"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-zinc-500 font-semibold block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 outline-none focus:border-black"
                  >
                    <option value="Software">Software</option>
                    <option value="Hosting">Hosting</option>
                    <option value="Travel">Travel</option>
                    <option value="Design Tools">Design Tools</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-500 font-semibold block mb-1">Amount (€)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 outline-none focus:border-black font-mono font-bold"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full text-zinc-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-zinc-900 hover:bg-black text-white rounded-full font-semibold shadow-sm"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
