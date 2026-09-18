import React, { useState } from 'react';
import {
  User,
  Palette,
  Building,
  CreditCard,
  Sliders,
  Mail,
  Plug,
  Receipt,
  Check,
  Sparkles,
} from 'lucide-react';

export const RuneySettings: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'branding' | 'business' | 'payments' | 'general' | 'emails' | 'integrations' | 'billing'>('integrations');
  const [connectedTools, setConnectedTools] = useState<string[]>(['stripe']);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleConnect = (toolId: string) => {
    setConnectedTools((prev) =>
      prev.includes(toolId) ? prev.filter((t) => t !== toolId) : [...prev, toolId]
    );
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-5 pb-24 max-w-7xl mx-auto">
      {/* 1. Header with "Save Changes" Black Pill Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Settings</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Manage your account & preferences</p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 bg-zinc-900 hover:bg-black text-white rounded-full text-xs font-semibold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
        >
          {savedSuccess ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span>Saved!</span>
            </>
          ) : (
            <span>Save Changes</span>
          )}
        </button>
      </div>

      {/* 2. Main Settings Grid: Sub-Navigation + Content Panel (Matching Screenshot 1!) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Left Sub-Menu Column */}
        <div className="space-y-1 text-xs font-medium text-zinc-600">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'branding', label: 'Branding', icon: Palette },
            { id: 'business', label: 'Business Info', icon: Building },
            { id: 'payments', label: 'Payments', icon: CreditCard },
            { id: 'general', label: 'General', icon: Sliders },
            { id: 'emails', label: 'Emails', icon: Mail },
            { id: 'integrations', label: 'Integrations', icon: Plug },
            { id: 'billing', label: 'Billing', icon: Receipt },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSubTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-full transition-all text-left ${
                  isSelected
                    ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                    : 'hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right 3 Cols: Integrations Cards (Matching Screenshot 1 EXACTLY!) */}
        <div className="md:col-span-3 runey-card p-6 sm:p-8 space-y-6 shadow-runey-card">
          <div className="border-b border-zinc-100 pb-4">
            <h2 className="text-base font-bold text-zinc-900">Integrations</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Connect your favorite tools and services</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1: Stripe */}
            <div className="runey-card p-4 flex flex-col justify-between space-y-4 border border-zinc-200">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#635bff] flex items-center justify-center text-white font-black text-sm shadow-xs">
                  S
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">Stripe</h3>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Accept online payments directly through your invoices
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleConnect('stripe')}
                className={`w-full py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  connectedTools.includes('stripe')
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-white hover:bg-zinc-50 text-zinc-900 border-zinc-200'
                }`}
              >
                {connectedTools.includes('stripe') ? 'Connected ✓' : 'Connect'}
              </button>
            </div>

            {/* Card 2: Webhooks */}
            <div className="runey-card p-4 flex flex-col justify-between space-y-4 border border-zinc-200">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 font-bold text-sm shadow-xs border border-zinc-200">
                  <Plug size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">Webhooks</h3>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Send real-time event data to your own endpoints
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleConnect('webhooks')}
                className={`w-full py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  connectedTools.includes('webhooks')
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-white hover:bg-zinc-50 text-zinc-900 border-zinc-200'
                }`}
              >
                {connectedTools.includes('webhooks') ? 'Connected ✓' : 'Connect'}
              </button>
            </div>

            {/* Card 3: Zapier */}
            <div className="runey-card p-4 flex flex-col justify-between space-y-4 border border-zinc-200">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#ff4f00] flex items-center justify-center text-white font-black text-sm shadow-xs">
                  *
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">Zapier</h3>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Automate workflows between Runey and 5,000+ apps
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleConnect('zapier')}
                className={`w-full py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  connectedTools.includes('zapier')
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-white hover:bg-zinc-50 text-zinc-900 border-zinc-200'
                }`}
              >
                {connectedTools.includes('zapier') ? 'Connected ✓' : 'Connect'}
              </button>
            </div>

            {/* Card 4: PayPal (Soon) */}
            <div className="runey-card p-4 flex flex-col justify-between space-y-4 border border-zinc-200 opacity-90">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#003087] flex items-center justify-center text-white font-black text-sm shadow-xs">
                    P
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">PayPal</h3>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Let clients pay with PayPal quickly and securely
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5: Notion (Soon) */}
            <div className="runey-card p-4 flex flex-col justify-between space-y-4 border border-zinc-200 opacity-90">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-white font-bold text-sm shadow-xs">
                    N
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">Notion</h3>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Sync your projects, clients, and docs with Notion
                  </p>
                </div>
              </div>
            </div>

            {/* Card 6: Slack (Soon) */}
            <div className="runey-card p-4 flex flex-col justify-between space-y-4 border border-zinc-200 opacity-90">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#4a154b] flex items-center justify-center text-white font-bold text-sm shadow-xs">
                    #
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">Slack</h3>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Get instant notifications for payments and activity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
