import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Search,
  ExternalLink,
  Download,
  CheckCircle2,
  MoreHorizontal,
  CreditCard,
  FileText,
} from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';
import { RuneyInvoice } from '@/types';

export const RuneyInvoices: React.FC = () => {
  const { invoices, addInvoice, clients } = useRuneyStore();
  const [selectedInvoice, setSelectedInvoice] = useState<RuneyInvoice | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New Invoice Form
  const [clientName, setClientName] = useState(clients[0]?.name || 'James Chen');
  const [amount, setAmount] = useState(4850);
  const [projectTitle, setProjectTitle] = useState('Brand Redesign & Design System');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addInvoice({
      invoiceNumber: `RNY-04092026-${String(invoices.length + 9).padStart(4, '0')}`,
      clientName,
      clientCompany: clients.find((c) => c.name === clientName)?.company || 'Client Corp',
      amount: Number(amount),
      status: 'open',
      issueDate: 'Sep 19, 2026',
      dueDate: 'Oct 03, 2026',
      currency: '€',
      projectTitle,
    });
    setIsNewModalOpen(false);
  };

  return (
    <div className="space-y-5 pb-24 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Invoices & Documents</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Create professional client invoices, manage payment links, and track collection status.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-4 py-2 bg-zinc-900 hover:bg-black text-white rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
        >
          <Plus size={13} />
          <span>New Invoice</span>
        </button>
      </div>

      {/* 2. Invoices List Table */}
      <div className="runey-card p-5 space-y-4 shadow-runey-card">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <span className="text-xs font-bold text-zinc-900">All Invoices ({invoices.length})</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-full text-xs">
              <Search size={13} className="text-zinc-400" />
              <input type="text" placeholder="Search invoices..." className="bg-transparent text-xs outline-none w-32" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                <th className="pb-3 px-3">Invoice #</th>
                <th className="pb-3 px-3">Client</th>
                <th className="pb-3 px-3">Project</th>
                <th className="pb-3 px-3">Issue Date</th>
                <th className="pb-3 px-3">Due Date</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Amount</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-zinc-900 flex items-center gap-2">
                    <FileText size={14} className="text-blue-600" />
                    <span>{inv.invoiceNumber}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-zinc-900">{inv.clientCompany}</p>
                    <p className="text-[11px] text-zinc-400">{inv.clientName}</p>
                  </td>
                  <td className="py-3.5 px-3 text-zinc-600">{inv.projectTitle || 'General Retainer'}</td>
                  <td className="py-3.5 px-3 font-mono text-zinc-500">{inv.issueDate}</td>
                  <td className="py-3.5 px-3 font-mono text-zinc-500">{inv.dueDate}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`runey-tag ${
                        inv.status === 'paid'
                          ? 'bg-emerald-50 text-emerald-700'
                          : inv.status === 'open'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {inv.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-zinc-900">
                    {inv.currency}{inv.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium transition-colors"
                    >
                      View & Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail / Payment Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-zinc-200 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  INV
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">{selectedInvoice.invoiceNumber}</h3>
                  <p className="text-[11px] text-zinc-500">{selectedInvoice.clientCompany}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="w-6 h-6 rounded-full hover:bg-zinc-100 text-zinc-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Total Amount Due:</span>
                <span className="text-base font-bold text-zinc-900 font-mono">
                  {selectedInvoice.currency}{selectedInvoice.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Payment Terms:</span>
                <span>Net 14 (Stripe / Bank Wire)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 rounded-full text-zinc-600 text-xs font-semibold"
              >
                Close
              </button>
              {selectedInvoice.status !== 'paid' && (
                <button
                  onClick={() => {
                    useRuneyStore.setState((s) => ({
                      invoices: s.invoices.map((i) =>
                        i.id === selectedInvoice.id ? { ...i, status: 'paid' } : i
                      ),
                    }));
                    setSelectedInvoice({ ...selectedInvoice, status: 'paid' });
                  }}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5"
                >
                  <CreditCard size={14} />
                  <span>Simulate Stripe Checkout (€{selectedInvoice.amount})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-zinc-200 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-900">Create New Invoice</h3>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="w-6 h-6 rounded-full hover:bg-zinc-100 text-zinc-400"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-500 font-semibold block mb-1">Select Client</label>
                <select
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 outline-none focus:border-black"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.company} ({c.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-zinc-500 font-semibold block mb-1">Project Title</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Marketing Website"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 outline-none focus:border-black"
                />
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
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-full text-zinc-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-zinc-900 hover:bg-black text-white rounded-full font-semibold shadow-sm"
                >
                  Create & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
