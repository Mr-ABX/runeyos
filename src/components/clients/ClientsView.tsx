'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Plus,
  ExternalLink,
  Mail,
  Phone,
  DollarSign,
  Briefcase,
  Copy,
  Check,
  Globe,
  Sparkles,
} from 'lucide-react';
import { useRuneyStore } from '@/lib/store';
import { Client } from '@/lib/types';

export const ClientsView: React.FC = () => {
  const { clients, createClient, showToast, setActiveTab } = useRuneyStore();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);

  // New Client Form
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [defaultHourlyRate, setDefaultHourlyRate] = useState(150);
  const [currency, setCurrency] = useState('USD');

  const handleCopyLink = (token: string) => {
    const portalUrl = `${window.location.origin}/portal/${token}`;
    navigator.clipboard.writeText(portalUrl);
    setCopiedToken(token);
    showToast('Client Portal Magic Link copied to clipboard!');
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim() || !email.trim()) return;

    createClient({
      name,
      company,
      email,
      phone,
      billingAddress,
      defaultHourlyRate: Number(defaultHourlyRate),
      currency,
    });

    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setBillingAddress('');
    setIsNewClientModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Client CRM & Directory</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {clients.length} active clients
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage company relationships, hourly billing rates, and zero-friction magic-link client portals.
          </p>
        </div>

        <button
          onClick={() => setIsNewClientModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus size={14} />
          <span>Add Client</span>
        </button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clients.map((client) => (
          <motion.div
            key={client.id}
            whileHover={{ y: -3 }}
            className="glass-panel rounded-3xl p-5 border border-white/10 hover:border-white/20 transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Header Avatar & Company */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={client.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={client.name}
                    className="w-12 h-12 rounded-2xl border border-white/15 object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{client.company}</h3>
                    <p className="text-xs text-zinc-400">{client.name}</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  ${client.defaultHourlyRate}/hr
                </span>
              </div>

              {/* Contact Information */}
              <div className="space-y-1.5 pt-3 text-xs text-zinc-300 border-t border-white/5 mt-3">
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-zinc-500 shrink-0" />
                  <span className="truncate">{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-zinc-500 shrink-0" />
                    <span>{client.phone}</span>
                  </div>
                )}
                {client.notes && (
                  <p className="text-[11px] text-zinc-400 italic pt-1 line-clamp-2">
                    &quot;{client.notes}&quot;
                  </p>
                )}
              </div>

              {/* Financial Snapshot */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5 text-xs">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Total Billed</span>
                  <span className="text-xs font-bold text-white font-mono">
                    ${client.totalBilled.toLocaleString()}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Outstanding</span>
                  <span
                    className={`text-xs font-bold font-mono ${
                      client.outstandingBalance > 0 ? 'text-amber-300' : 'text-emerald-400'
                    }`}
                  >
                    ${client.outstandingBalance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Portal Action Buttons */}
            <div className="pt-2 border-t border-white/5 flex items-center gap-2">
              <button
                onClick={() => handleCopyLink(client.portalToken)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
              >
                {copiedToken === client.portalToken ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Magic Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveTab('portal')}
                className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 transition-colors"
                title="Preview Client Portal"
              >
                <ExternalLink size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Client Modal */}
      {isNewClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-panel rounded-3xl p-6 border border-white/15 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Add New Client Profile</h3>
              <button
                onClick={() => setIsNewClientModalOpen(false)}
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Primary Contact *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@acme.com"
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Billing Address</label>
                <input
                  type="text"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="123 Market St, Suite 100, City, State"
                  className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Default Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={defaultHourlyRate}
                    onChange={(e) => setDefaultHourlyRate(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Currency</label>
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
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsNewClientModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all"
                >
                  Save Client
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
