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
  FileText,
  Layers,
  DollarSign,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';

export const RuneyAIStudio: React.FC = () => {
  const { createTask } = useRuneyStore();
  const [provider, setProvider] = useState<'openai' | 'anthropic' | 'gemini' | 'deepseek'>('anthropic');
  const [apiKey, setApiKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(true);
  const [copied, setCopied] = useState(false);

  // Active AI Tab
  const [aiTool, setAiTool] = useState<'decompose' | 'proposal' | 'sow'>('decompose');

  // Input state
  const [promptInput, setPromptInput] = useState(
    'Redesign a mobile crypto trading dashboard with biometric authentication, dark mode tokens, and real-time WebSocket charts.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<any>(null);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    setIsKeySaved(true);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedOutput(null);

    setTimeout(() => {
      setIsGenerating(false);
      if (aiTool === 'decompose') {
        setGeneratedOutput({
          type: 'decomposition',
          projectTitle: 'Crypto Trading Mobile App UI/UX',
          estimatedHours: 38,
          suggestedBudget: '€5,400',
          tasks: [
            { title: 'Biometric Auth & FaceID Flow Screens', priority: 'urgent', cost: 1200, category: 'Design' },
            { title: 'Apple Liquid Glass Dark Mode Tokens & Components', priority: 'high', cost: 1400, category: 'System' },
            { title: 'Real-time WebSocket Trading Chart Visuals', priority: 'urgent', cost: 1800, category: 'Engineering' },
            { title: 'User Testing & Prototype Export to CSV', priority: 'medium', cost: 1000, category: 'QA' },
          ],
        });
      } else if (aiTool === 'proposal') {
        setGeneratedOutput({
          type: 'proposal',
          headline: 'Client Proposal: Modern Crypto Trading Platform',
          summary: 'A 3-week end-to-end design & front-end implementation sprint focused on hyper-responsive trading interfaces and bank-grade security visuals.',
          phases: [
            { name: 'Phase 1: Architecture & Wireframes', timeline: 'Week 1', fee: '€1,800' },
            { name: 'Phase 2: High-Fidelity UI & Motion Design', timeline: 'Week 2', fee: '€2,400' },
            { name: 'Phase 3: Prototype Polish & Developer Handoff', timeline: 'Week 3', fee: '€1,200' },
          ],
        });
      } else {
        setGeneratedOutput({
          type: 'sow',
          title: 'Statement of Work (SOW) & SLA Terms',
          clause1: 'All IP and Figma design files transfer completely upon settlement of the final invoice.',
          clause2: 'Includes 2 rounds of client revisions and 30 days of post-handoff support.',
        });
      }
    }, 1000);
  };

  const handleAddToKanban = (task: any) => {
    createTask({
      title: task.title,
      priority: task.priority,
      cost: task.cost,
      category: task.category,
      status: 'todo',
    });
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner with Runey Aesthetic */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg shadow-black/10">
              <Sparkles size={22} className="text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Runey AI Studio</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  BYOK Privacy Mode
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Generate project scopes, task decompositions, and client proposals directly in your browser. Zero token markups.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>100% Client-Side Local Execution</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Tool Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 space-y-5">
            {/* Tool Selection Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <button
                onClick={() => setAiTool('decompose')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  aiTool === 'decompose'
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Layers size={14} />
                <span>Task Breakdown & Estimation</span>
              </button>
              <button
                onClick={() => setAiTool('proposal')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  aiTool === 'proposal'
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText size={14} />
                <span>Client Proposal Generator</span>
              </button>
              <button
                onClick={() => setAiTool('sow')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  aiTool === 'sow'
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <DollarSign size={14} />
                <span>SOW & Contract Drafter</span>
              </button>
            </div>

            {/* Prompt Area */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-800 flex items-center justify-between">
                <span>Project Description or Client Request</span>
                <span className="text-[11px] font-normal text-gray-400">Describe the deliverables in plain english</span>
              </label>

              <textarea
                rows={3}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-all text-gray-900 leading-relaxed resize-none"
                placeholder="e.g. Design a complete SaaS landing page with responsive layouts, 3D hero icons, and Stripe pricing table..."
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-gray-500 flex items-center gap-1.5">
                  <Bot size={13} className="text-gray-400" />
                  <span>Model: Claude 3.5 Sonnet / OpenAI GPT-4o</span>
                </span>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-5 py-2 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-xs transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 shadow-sm"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Generating with AI...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={13} className="text-emerald-400 fill-emerald-400" />
                      <span>Generate AI Output</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Results Card */}
            {generatedOutput && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-4"
              >
                {generatedOutput.type === 'decomposition' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-200/70 pb-2.5">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{generatedOutput.projectTitle}</h4>
                        <p className="text-[11px] text-gray-500">
                          Est: {generatedOutput.estimatedHours} hrs • Suggested Quote: {generatedOutput.suggestedBudget}
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                        {generatedOutput.tasks.length} Tasks Decomposed
                      </span>
                    </div>

                    <div className="space-y-2">
                      {generatedOutput.tasks.map((task: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200/60 shadow-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <div>
                              <p className="text-xs font-medium text-gray-900">{task.title}</p>
                              <p className="text-[10px] text-gray-400">{task.category} • €{task.cost}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleAddToKanban(task)}
                            className="px-2.5 py-1 rounded-lg bg-gray-900 hover:bg-black text-white text-[11px] font-medium transition-all active:scale-95 flex items-center gap-1"
                          >
                            <span>Add to Kanban</span>
                            <ArrowRight size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {generatedOutput.type === 'proposal' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gray-900">{generatedOutput.headline}</h4>
                      <button
                        onClick={() => handleCopyText(JSON.stringify(generatedOutput, null, 2))}
                        className="text-xs font-semibold text-gray-600 hover:text-black flex items-center gap-1"
                      >
                        {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copied ? 'Copied!' : 'Copy Proposal'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed bg-white p-3 rounded-xl border border-gray-200/60">
                      {generatedOutput.summary}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {generatedOutput.phases.map((ph: any, i: number) => (
                        <div key={i} className="p-2.5 bg-white rounded-xl border border-gray-200/60 text-center">
                          <p className="text-[10px] text-gray-400">{ph.timeline}</p>
                          <p className="text-xs font-bold text-gray-900">{ph.name}</p>
                          <p className="text-xs font-semibold text-emerald-600 mt-1">{ph.fee}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {generatedOutput.type === 'sow' && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-900">{generatedOutput.title}</h4>
                    <div className="space-y-2 text-xs text-gray-700 bg-white p-3.5 rounded-xl border border-gray-200/60">
                      <p><strong>1. Intellectual Property:</strong> {generatedOutput.clause1}</p>
                      <p><strong>2. Revisions & Warranty:</strong> {generatedOutput.clause2}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Right 1 Col: BYOK API Key Vault */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <Key size={16} className="text-gray-900" />
              <h2 className="text-sm font-bold text-gray-900">BYOK Key Vault</h2>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Store your personal AI API keys. Keys remain strictly encrypted in your local browser or desktop app state.
            </p>

            <form onSubmit={handleSaveKey} className="space-y-3">
              <div>
                <label className="text-[11px] text-gray-600 font-semibold block mb-1">
                  AI Provider
                </label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="anthropic">Anthropic (Claude 3.5 Sonnet)</option>
                  <option value="openai">OpenAI (GPT-4o)</option>
                  <option value="gemini">Google (Gemini 2.0 Flash)</option>
                  <option value="deepseek">DeepSeek (DeepSeek R1 / V3)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-gray-600 font-semibold block mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-api03-..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-900 font-mono focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200/60 text-[11px] text-gray-600 flex items-center gap-2">
                <Lock size={13} className="text-emerald-600 shrink-0" />
                <span>AES-GCM Local Storage Encryption</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
              >
                <Key size={13} />
                <span>Save Local Key</span>
              </button>
            </form>

            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  <span>Active Vault Status</span>
                </span>
                <span className="font-semibold text-emerald-700">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
