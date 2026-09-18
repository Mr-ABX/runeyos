'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  ShieldCheck,
  CreditCard,
  Building,
  Database,
  Lock,
  Globe,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useRuneyStore } from '@/lib/store';

export const SettingsView: React.FC = () => {
  const { showToast } = useRuneyStore();
  const [agencyName, setAgencyName] = useState('Apex Design Studio');
  const [agencyEmail, setAgencyEmail] = useState('julian@apexdesign.io');
  const [currency, setCurrency] = useState('USD');
  const [defaultHourlyRate, setDefaultHourlyRate] = useState(150);
  const [stripeAccountId, setStripeAccountId] = useState('acct_1Mpx92LiveStripeConnect');
  const [dbMode, setDbMode] = useState<'sqlite' | 'postgres'>('postgres');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Workspace settings updated successfully.');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
          <span>Workspace Settings</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            Open-Core Edition
          </span>
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Configure agency branding, default currency, Stripe Connect keys, and self-hosting parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Agency Brand & Identity */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Building size={18} className="text-cyan-400" />
            <h2 className="text-sm font-bold text-white">Agency Profile & Branding</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1">Agency Name</label>
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl glass-input"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1">Contact Email</label>
              <input
                type="email"
                value={agencyEmail}
                onChange={(e) => setAgencyEmail(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl glass-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">
                  Default Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                >
                  <option value="USD" className="bg-zinc-900 text-white">USD ($)</option>
                  <option value="EUR" className="bg-zinc-900 text-white">EUR (€)</option>
                  <option value="GBP" className="bg-zinc-900 text-white">GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  value={defaultHourlyRate}
                  onChange={(e) => setDefaultHourlyRate(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Stripe Connect & Financial Gateway */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <CreditCard size={18} className="text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Payment Gateway (Stripe Connect)</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1">
                Connected Stripe Account ID
              </label>
              <input
                type="text"
                value={stripeAccountId}
                onChange={(e) => setStripeAccountId(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl glass-input font-mono"
              />
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span className="text-xs text-emerald-300 font-semibold">Stripe Checkout Active</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono">Charges 0% fee</span>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1">Database Mode</label>
              <select
                value={dbMode}
                onChange={(e) => setDbMode(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-xl glass-input"
              >
                <option value="postgres" className="bg-zinc-900 text-white">
                  PostgreSQL 16 (Cloud / Supabase)
                </option>
                <option value="sqlite" className="bg-zinc-900 text-white">
                  SQLite (Local Zero-Config)
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 active:scale-95"
          >
            <Save size={14} />
            <span>Save All Workspace Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
