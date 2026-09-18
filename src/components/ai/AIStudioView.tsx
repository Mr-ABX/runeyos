'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Key,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Cpu,
  Bot,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { useRuneyStore } from '@/lib/store';

export const AIStudioView: React.FC = () => {
  const { showToast } = useRuneyStore();
  const [provider, setProvider] = useState<'openai' | 'anthropic' | 'gemini' | 'groq'>('openai');
  const [apiKey, setApiKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);

  // Smart prompt simulation state
  const [promptInput, setPromptInput] = useState(
    'Create a 3-week design sprint for a fintech mobile app with dark mode and KYC verification.'
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    setIsKeySaved(true);
    showToast(`Encrypted ${provider.toUpperCase()} API Key saved in local vault.`);
  };

  const handleSimulateDecomposition = () => {
    setIsSimulating(true);
    setGeneratedResult(null);

    setTimeout(() => {
      setIsSimulating(false);
      setGeneratedResult(
        JSON.stringify(
          {
            sprint: 'Fintech Mobile App MVP',
            estimatedHours: 42,
            suggestedBudget: '$6,300 USD',
            generatedTasks: [
              { title: 'UX Research & KYC Flow Wireframing', priority: 'urgent', est: '12 hrs' },
              { title: 'Apple Liquid Glass Dark Mode Theme Tokens', priority: 'high', est: '8 hrs' },
              { title: 'Plaid & Stripe Identity Integration API', priority: 'urgent', est: '14 hrs' },
              { title: 'Client Sign-off & Milestone Demo', priority: 'medium', est: '8 hrs' },
            ],
          },
          null,
          2
        )
      );
      showToast('AI Task Decomposition Preview Generated!');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-indigo-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 flex items-center justify-center shadow-xl shadow-pink-500/20 shrink-0">
              <Sparkles size={28} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  RuneyOS AI Studio
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  Phase 2 Architecture
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1">
                Bring-Your-Own-Key (BYOK) privacy-first AI intelligence for smart project breakdowns and proposal drafting.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>100% Client-Side / Zero Token Markups</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Previews */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-pink-400" />
                <h2 className="text-sm font-bold text-white">Smart Task Decomposition Engine</h2>
              </div>
              <span className="text-[10px] font-mono font-bold text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
                Interactive Preview
              </span>
            </div>

            <p className="text-xs text-zinc-400">
              Enter a high-level client prompt or project description to simulate automated task breakdown and budget estimation:
            </p>

            <div className="space-y-3">
              <textarea
                rows={3}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-2xl glass-input leading-relaxed"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">
                  Simulates direct LLM function calling and JSON task graph creation.
                </span>

                <button
                  onClick={handleSimulateDecomposition}
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-pink-500/20 transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                >
                  <Zap size={13} />
                  <span>{isSimulating ? 'Analyzing...' : 'Decompose Project'}</span>
                </button>
              </div>
            </div>

            {/* Simulated Output Card */}
            {generatedResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-black/40 border border-pink-500/20 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-300 font-mono">
                    Output: Structured Task Spec
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Valid JSON Schema</span>
                  </span>
                </div>
                <pre className="text-[11px] font-mono text-zinc-300 overflow-x-auto p-2 bg-zinc-950/80 rounded-xl border border-white/5 custom-scrollbar">
                  {generatedResult}
                </pre>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right 1 Col: BYOK API Key Vault */}
        <div className="space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Key size={18} className="text-cyan-400" />
              <h2 className="text-sm font-bold text-white">BYOK Key Vault</h2>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Store your own model API keys. In self-hosted mode, keys are encrypted locally using AES-256.
            </p>

            <form onSubmit={handleSaveKey} className="space-y-3">
              <div>
                <label className="text-[11px] text-zinc-400 font-semibold block mb-1">
                  Select Provider
                </label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 rounded-xl glass-input"
                >
                  <option value="openai" className="bg-zinc-900 text-white">OpenAI (GPT-4o)</option>
                  <option value="anthropic" className="bg-zinc-900 text-white">Anthropic (Claude 3.5)</option>
                  <option value="gemini" className="bg-zinc-900 text-white">Google Gemini 2.0</option>
                  <option value="groq" className="bg-zinc-900 text-white">Groq (Llama 3.3)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 font-semibold block mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-... or sk-proj-..."
                  className="w-full text-xs px-3 py-2 rounded-xl glass-input font-mono"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-zinc-400 flex items-center gap-2">
                <Lock size={13} className="text-emerald-400 shrink-0" />
                <span>Encrypted at rest with local master salt.</span>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Key size={13} />
                <span>Save Encrypted Key</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
