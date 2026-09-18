import React, { useState } from 'react';
import { Plus, Search, Mail, Phone, Globe, DollarSign, ArrowRight } from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';
import { RuneyClient } from '@/types';
import { RuneyClientDetail } from './RuneyClientDetail';

export const RuneyClients: React.FC = () => {
  const { clients, selectedClient, setSelectedClient } = useRuneyStore();
  const [isDetailView, setIsDetailView] = useState(true); // Default to James Chen detail view matching screenshot 4!

  if (isDetailView && selectedClient) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsDetailView(false)}
            className="text-xs font-semibold text-zinc-600 hover:text-black flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm"
          >
            ← View All Clients Directory
          </button>
        </div>
        <RuneyClientDetail />
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-24 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Clients & CRM</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage your company relationships, contracts, and view customer timeline milestones.
          </p>
        </div>

        <button className="px-4 py-2 bg-zinc-900 hover:bg-black text-white rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all">
          <Plus size={13} />
          <span>New Client</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            onClick={() => {
              setSelectedClient(client);
              setIsDetailView(true);
            }}
            className="runey-card p-5 space-y-4 cursor-pointer runey-card-hover"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-zinc-200"
                />
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">{client.name}</h3>
                  <p className="text-xs text-zinc-500">{client.company}</p>
                </div>
              </div>
              <span className="runey-tag bg-emerald-50 text-emerald-700">● Active</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Total Billed</span>
                <span className="font-bold text-zinc-900 font-mono">€{client.totalBilled.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Collected</span>
                <span className="font-bold text-emerald-600 font-mono">€{client.collected.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs text-zinc-500">
              <span>{client.projectsCount} Project Linked</span>
              <span className="text-zinc-900 font-semibold flex items-center gap-1">
                <span>View Timeline</span>
                <ArrowRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
