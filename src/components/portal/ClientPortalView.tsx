'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  CreditCard,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useRuneyStore } from '@/lib/store';

export const ClientPortalView: React.FC = () => {
  const { deliverables, invoices, approveDeliverable, showToast } = useRuneyStore();
  const [feedbackText, setFeedbackText] = useState<{ [key: string]: string }>({});

  const clientInvoices = invoices.filter((i) => i.clientId === 'cli-1');

  const handleApprove = (id: string) => {
    approveDeliverable(id, feedbackText[id] || 'Approved by client via Portal');
    showToast('Deliverable marked as APPROVED!');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Agency Branding Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-gradient-to-r from-indigo-900/40 via-zinc-900/60 to-cyan-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-500/20 shrink-0">
              <span className="font-black text-white text-2xl tracking-wider">A</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Apex Design Studio</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck size={12} />
                  <span>Verified Client Portal</span>
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1">
                Client Workspace for <strong className="text-white">Apex Design Labs (Elena Rostova)</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              Magic Link Access: <strong className="text-cyan-300 font-mono">portal_apex_89x2q1</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Project Milestones & Deliverables Review */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Deliverables Review Queue */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <FileText size={18} className="text-cyan-400" />
                <span>Deliverables & Approvals</span>
              </h2>
              <span className="text-xs text-zinc-400">
                {deliverables.filter((d) => d.status === 'approved').length} of {deliverables.length} approved
              </span>
            </div>

            <div className="space-y-3">
              {deliverables.map((del) => (
                <div
                  key={del.id}
                  className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{del.title}</h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            del.status === 'approved'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {del.status === 'approved' ? 'Approved ✓' : 'Pending Review'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{del.description}</p>
                    </div>

                    <button
                      onClick={() => showToast(`Downloading ${del.title}`)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Download size={13} />
                      <span>Download ({del.fileSize})</span>
                    </button>
                  </div>

                  {/* Feedback / Sign-off section */}
                  {del.status === 'pending_approval' ? (
                    <div className="pt-3 border-t border-white/5 space-y-2.5">
                      <input
                        type="text"
                        value={feedbackText[del.id] || ''}
                        onChange={(e) =>
                          setFeedbackText({ ...feedbackText, [del.id]: e.target.value })
                        }
                        placeholder="Optional feedback notes for the agency..."
                        className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => showToast('Revision requested. Agency notified.')}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold"
                        >
                          Request Revisions
                        </button>
                        <button
                          onClick={() => handleApprove(del.id)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <CheckCircle2 size={13} />
                          <span>Approve Deliverable</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                      <CheckCircle2 size={14} />
                      <span>{del.clientFeedback}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Invoices & Payment Portal */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <CreditCard size={18} className="text-emerald-400" />
            <span>Open Invoices & Pay</span>
          </h2>

          <div className="space-y-3">
            {clientInvoices.map((inv) => (
              <div
                key={inv.id}
                className="glass-panel rounded-2xl p-4 border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-white">{inv.invoiceNumber}</h3>
                    <p className="text-[11px] text-zinc-400">Due {inv.dueDate}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      inv.status === 'paid'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-xs text-zinc-400">Amount Due:</span>
                  <span className="text-base font-mono font-bold text-white">
                    ${inv.totalAmount.toLocaleString()} {inv.currency}
                  </span>
                </div>

                {inv.status !== 'paid' && (
                  <button
                    onClick={() => showToast('Redirecting to Stripe Hosted Checkout...')}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <CreditCard size={14} />
                    <span>Pay with Card via Stripe</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
