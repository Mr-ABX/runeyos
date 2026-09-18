import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  Clock,
  PieChart as PieChartIcon,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export const RuneyAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | 'year'>('30d');

  const stats = [
    {
      title: 'Net Revenue',
      value: '€82,650.00',
      change: '+18.4%',
      isPositive: true,
      subtext: 'vs previous 30 days',
    },
    {
      title: 'Billable Hours',
      value: '342.5 hrs',
      change: '+12.1%',
      isPositive: true,
      subtext: 'avg 8.2 hrs / day',
    },
    {
      title: 'Effective Hourly Rate',
      value: '€145.00/h',
      change: '+€15.00',
      isPositive: true,
      subtext: 'target €120/h exceeded',
    },
    {
      title: 'Operating Expenses',
      value: '€1,836.80',
      change: '-4.2%',
      isPositive: true,
      subtext: '97.8% profit margin',
    },
  ];

  const clientRevenue = [
    { client: 'Kredo Capital', amount: '€28,400', share: 34, color: 'bg-black' },
    { client: 'FinFlow Inc', amount: '€22,150', share: 27, color: 'bg-gray-800' },
    { client: 'Aether Labs', amount: '€18,200', share: 22, color: 'bg-emerald-600' },
    { client: 'Chronos Horology', amount: '€13,900', share: 17, color: 'bg-gray-400' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Financial & Workload Analytics</h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time telemetry across billable utilization, client contribution, and operational yield.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-2xl border border-gray-200/80 shadow-xs flex items-center">
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                timeRange === '30d' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                timeRange === '90d' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quarter
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                timeRange === 'year' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Full Year
            </button>
          </div>

          <button className="px-3.5 py-2 bg-white rounded-2xl border border-gray-200/80 shadow-xs text-xs font-bold text-gray-700 hover:text-black flex items-center gap-1.5 active:scale-95">
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>{stat.title}</span>
              <span
                className={`flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  stat.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                }`}
              >
                {stat.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                <span>{stat.change}</span>
              </span>
            </div>

            <div>
              <p className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Chart & Breakdown Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Revenue Flow */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Revenue & Cashflow Progression</h3>
              <p className="text-xs text-gray-500">Monthly billing compared with target baseline</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-black inline-block"></span>
                <span>Revenue (€)</span>
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span>Profit Margins</span>
              </span>
            </div>
          </div>

          {/* Bar Chart Visual */}
          <div className="h-64 flex items-end justify-between gap-3 pt-4 px-2">
            {[
              { month: 'May', val: 45, profit: 42 },
              { month: 'Jun', val: 62, profit: 58 },
              { month: 'Jul', val: 55, profit: 51 },
              { month: 'Aug', val: 78, profit: 74 },
              { month: 'Sep', val: 70, profit: 67 },
              { month: 'Oct (Est)', val: 92, profit: 88 },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  €{col.val}k
                </span>
                <div className="w-full max-w-[48px] bg-gray-100 rounded-2xl h-full relative overflow-hidden flex flex-col justify-end p-1">
                  <div
                    className="w-full bg-black rounded-xl group-hover:bg-emerald-600 transition-all duration-300"
                    style={{ height: `${col.val}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-gray-600">{col.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Client Concentration */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-gray-900">Client Concentration</h3>
            <p className="text-xs text-gray-500">Distribution of gross billing</p>
          </div>

          {/* Multi-segment Progress Bar */}
          <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden flex">
            {clientRevenue.map((c, i) => (
              <div key={i} className={`h-full ${c.color}`} style={{ width: `${c.share}%` }} />
            ))}
          </div>

          {/* List of Clients */}
          <div className="space-y-3.5 pt-2">
            {clientRevenue.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${c.color}`} />
                  <span className="font-semibold text-gray-900">{c.client}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900">{c.amount}</span>
                  <span className="text-[11px] text-gray-400 ml-1.5">({c.share}%)</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-3 mt-4">
            <Sparkles size={16} className="text-emerald-700 mt-0.5 shrink-0" />
            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              Portfolio risk is low. Top client accounts for 34% of revenue, well under the 40% concentration ceiling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
