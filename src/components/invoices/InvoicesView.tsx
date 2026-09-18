'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Receipt,
  Plus,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Download,
  CreditCard,
} from 'lucide-react';
import { useRuneyStore } from '@/lib/store';
import { Invoice, InvoiceStatus } from '@/lib/types';

export const InvoicesView: React.FC = () => {
  const {
    invoices,
    timeEntries,
    clients,
    convertTimeToInvoice,
    createInvoice,
    showToast,
  } = useRuneyStore();

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isTimeToInvoiceModalOpen, setIsTimeToInvoiceModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [selectedTimeIds, setSelectedTimeIds] = useState<string[]>([]);

  const unbilledEntries = timeEntries.filter((t) => !t.isBilled && t.clientId === selectedClientId);

  const totalPaid = invoices
    .filter((i) => i.status === 'paid')
    .reduce((acc, i) => acc + i.totalAmount, 0);

  const totalPending = invoices
    .filter((i) => i.status === 'sent' || i.status === 'overdue')
    .reduce((acc, i) => acc + i.totalAmount, 0);

  const handleToggleTimeEntry = (id: string) => {
    setSelectedTimeIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAllUnbilled = () => {
    if (selectedTimeIds.length === unbilledEntries.length) {
      setSelectedTimeIds([]);
    } else {
      setSelectedTimeIds(unbilledEntries.map((t) => t.id));
    }
  };

  const handleGenerateFromTime = () => {
    if (selectedTimeIds.length === 0) {
      showToast('Please select at least one time entry');
      return;
    }
    convertTimeToInvoice(selectedClientId, selectedTimeIds);
    setIsTimeToInvoiceModalOpen(false);
    setSelectedTimeIds([]);
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'sent':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'overdue':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'draft':
      default:
        return 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Invoices & Financials</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Stripe Connected
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Create branded client invoices, convert unbilled timesheets, and track receivables.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedTimeIds(unbilledEntries.map((t) => t.id));
              setIsTimeToInvoiceModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Clock size={14} />
            <span>Time-to-Invoice ({timeEntries.filter((t) => !t.isBilled).length})</span>
          </button>

          <button
            onClick={() => {
              const client = clients[0];
              createInvoice({
                clientId: client.id,
                clientName: client.name,
                clientCompany: client.company,
                clientEmail: client.email,
                status: 'draft',
                issueDate: new Date().toISOString().split('T')[0],
                dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
                currency: 'USD',
                items: [
                  {
                    id: `item-${Date.now()}`,
                    description: 'Creative Design & Engineering Sprint',
                    quantity: 1,
                    unitPrice: 2500,
                    amount: 2500,
                  },
                ],
                subtotal: 2500,
                taxRate: 0,
                taxAmount: 0,
                totalAmount: 2500,
                notes: 'Standard Net 14 payment terms.',
                stripePaymentUrl: `https://checkout.stripe.com/pay/cs_live_${Date.now()}`,
              });
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Plus size={14} />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Summary Glass Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-white/10">
          <span className="text-xs font-semibold text-zinc-400">Total Collected (Paid)</span>
          <h2 className="text-2xl font-black text-white font-mono mt-1">${totalPaid.toLocaleString()}</h2>
          <span className="text-[11px] text-emerald-400 font-medium">100% deposited to Stripe bank</span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-white/10">
          <span className="text-xs font-semibold text-zinc-400">Outstanding Receivables</span>
          <h2 className="text-2xl font-black text-amber-300 font-mono mt-1">
            ${totalPending.toLocaleString()}
          </h2>
          <span className="text-[11px] text-zinc-400">
            {invoices.filter((i) => i.status === 'sent').length} invoices pending payment
          </span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-white/10">
          <span className="text-xs font-semibold text-zinc-400">Unbilled Time Value</span>
          <h2 className="text-2xl font-black text-cyan-300 font-mono mt-1">
            $
            {timeEntries
              .filter((t) => !t.isBilled)
              .reduce((acc, t) => acc + (t.durationSeconds / 3600) * t.hourlyRate, 0)
              .toFixed(2)}
          </h2>
          <span className="text-[11px] text-cyan-400 font-medium">Ready to convert to invoice</span>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass-panel rounded-3xl p-4 border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                <th className="pb-3 px-3">Invoice Number</th>
                <th className="pb-3 px-3">Client</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Issue Date</th>
                <th className="pb-3 px-3">Due Date</th>
                <th className="pb-3 px-3 text-right">Amount</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-zinc-200">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="py-3.5 px-3 font-mono font-bold text-white flex items-center gap-2">
                    <Receipt size={14} className="text-cyan-400" />
                    <span>{inv.invoiceNumber}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-white">{inv.clientCompany}</p>
                    <p className="text-[11px] text-zinc-400">{inv.clientName}</p>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${getStatusBadge(
                        inv.status
                      )}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-zinc-400">{inv.issueDate}</td>
                  <td className="py-3.5 px-3 font-mono text-zinc-400">{inv.dueDate}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-white text-right">
                    ${inv.totalAmount.toLocaleString()} {inv.currency}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
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

      {/* Invoice Detail / PDF Preview Glass Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                  INV
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{selectedInvoice.invoiceNumber}</h3>
                  <p className="text-xs text-zinc-400">Issued by Apex Design Studio</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Billed To & Dates */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-zinc-400 uppercase font-semibold text-[10px]">Billed To:</span>
                <p className="font-bold text-white">{selectedInvoice.clientCompany}</p>
                <p className="text-zinc-400">{selectedInvoice.clientName}</p>
                <p className="text-zinc-400">{selectedInvoice.clientEmail}</p>
              </div>

              <div className="space-y-1 text-right">
                <span className="text-zinc-400 uppercase font-semibold text-[10px]">Invoice Details:</span>
                <p className="text-zinc-300">
                  <span className="text-zinc-500">Issued:</span> {selectedInvoice.issueDate}
                </p>
                <p className="text-zinc-300">
                  <span className="text-zinc-500">Due:</span> {selectedInvoice.dueDate}
                </p>
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mt-1 border ${getStatusBadge(
                    selectedInvoice.status
                  )}`}
                >
                  {selectedInvoice.status}
                </span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-zinc-400 uppercase text-[10px] font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Qty / Hrs</th>
                    <th className="p-3 text-right">Rate</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-200">
                  {selectedInvoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="p-3 font-medium text-white">{item.description}</td>
                      <td className="p-3 text-center font-mono">{item.quantity}</td>
                      <td className="p-3 text-right font-mono">${item.unitPrice}</td>
                      <td className="p-3 text-right font-mono font-bold">${item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Calculation */}
            <div className="space-y-1.5 text-xs text-right border-t border-white/10 pt-3">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal:</span>
                <span className="font-mono">${selectedInvoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Tax ({selectedInvoice.taxRate}%):</span>
                <span className="font-mono">${selectedInvoice.taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-1 border-t border-white/5">
                <span>Total Amount:</span>
                <span className="font-mono text-cyan-300">
                  ${selectedInvoice.totalAmount.toLocaleString()} {selectedInvoice.currency}
                </span>
              </div>
            </div>

            {/* Actions: Stripe Checkout Simulation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                <CreditCard size={13} className="text-indigo-400" />
                <span>Protected by Stripe Connect 256-bit encryption</span>
              </span>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => showToast('PDF Invoice generated and downloaded.')}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </button>

                {selectedInvoice.status !== 'paid' && (
                  <button
                    onClick={() => {
                      showToast('Payment successful! Invoice marked as PAID.');
                      setSelectedInvoice({ ...selectedInvoice, status: 'paid' });
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <CheckCircle2 size={14} />
                    <span>Pay with Stripe</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Time to Invoice Bridge Modal */}
      {isTimeToInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-white/15 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock size={16} className="text-cyan-400" />
                <span>Convert Unbilled Time to Invoice</span>
              </h3>
              <button
                onClick={() => setIsTimeToInvoiceModalOpen(false)}
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1">Select Client</label>
              <select
                value={selectedClientId}
                onChange={(e) => {
                  setSelectedClientId(e.target.value);
                  setSelectedTimeIds([]);
                }}
                className="w-full text-xs px-3 py-2 rounded-xl glass-input"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id} className="bg-zinc-900 text-white">
                    {c.company} ({c.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-semibold">Unbilled Time Entries ({unbilledEntries.length})</span>
                <button
                  type="button"
                  onClick={handleSelectAllUnbilled}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  {selectedTimeIds.length === unbilledEntries.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {unbilledEntries.map((entry) => {
                  const isChecked = selectedTimeIds.includes(entry.id);
                  const hours = (entry.durationSeconds / 3600).toFixed(2);
                  const amount = (Number(hours) * entry.hourlyRate).toFixed(2);

                  return (
                    <label
                      key={entry.id}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-indigo-500/15 border-indigo-500/40 text-white'
                          : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleTimeEntry(entry.id)}
                          className="rounded border-zinc-700 text-indigo-500 focus:ring-0"
                        />
                        <div>
                          <p className="text-xs font-semibold text-white">{entry.projectName}</p>
                          <p className="text-[11px] text-zinc-400 line-clamp-1">{entry.description}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-mono font-bold text-cyan-300">${amount}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{hours} hrs</p>
                      </div>
                    </label>
                  );
                })}

                {unbilledEntries.length === 0 && (
                  <p className="text-xs text-zinc-500 text-center py-6">
                    No unbilled time entries found for this client.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsTimeToInvoiceModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerateFromTime}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all"
              >
                Generate Invoice ({selectedTimeIds.length})
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
