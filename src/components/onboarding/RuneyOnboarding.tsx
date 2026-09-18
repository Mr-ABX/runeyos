import React, { useState } from 'react';
import {
  LogIn,
  Plus,
  Copy,
  Check,
  ExternalLink,
  Upload,
  FileCheck,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useRuneyStore } from '@/store/useRuneyStore';

export const RuneyOnboarding: React.FC = () => {
  const { onboardingForms, clients } = useRuneyStore();
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [activeFormIndex, setActiveFormIndex] = useState(0);

  const currentForm = onboardingForms[activeFormIndex] || onboardingForms[0];

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="space-y-5 pb-24 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Client Onboarding Processor</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Collect client requirements, brand assets, project references, and digital signatures in 1 seamless link.
          </p>
        </div>

        <button className="px-4 py-2 bg-zinc-900 hover:bg-black text-white rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all">
          <Plus size={13} />
          <span>New Onboarding Flow</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 1 Col: List of Onboarding Portals */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Active Client Flows</h2>
          {onboardingForms.map((form, idx) => (
            <div
              key={form.id}
              onClick={() => setActiveFormIndex(idx)}
              className={`runey-card p-4 space-y-2 cursor-pointer transition-all ${
                activeFormIndex === idx ? 'ring-2 ring-black' : 'hover:bg-zinc-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-bold text-zinc-900">{form.clientName}</h3>
                <span
                  className={`runey-tag ${
                    form.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {form.status.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">{form.projectType}</p>
              <div className="flex items-center justify-between pt-1 border-t border-zinc-100 text-[10px] text-zinc-400">
                <span>{form.uploadedAssetsCount} Assets Uploaded</span>
                <span>{form.hasSignedAgreement ? 'Agreement Signed ✓' : 'Signature Pending'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right 2 Cols: Live Onboarding Processor Simulator */}
        <div className="lg:col-span-2 runey-card p-6 space-y-6 shadow-runey-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
            <div>
              <span className="runey-tag bg-zinc-100 text-zinc-700 text-[10px]">Client Preview</span>
              <h2 className="text-base font-bold text-zinc-900 mt-1">{currentForm.clientName}</h2>
              <p className="text-xs text-zinc-500">{currentForm.projectType}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(currentForm.shareableLink)}
                className="px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedLink === currentForm.shareableLink ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Shareable Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Onboarding Steps Checklist */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Onboarding Steps & Requirements
            </h3>

            <div className="space-y-3">
              {currentForm.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-100"
                >
                  <div className="mt-0.5">
                    {step.completed ? (
                      <CheckCircle2 size={18} className="text-emerald-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-300" />
                    )}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <h4 className="text-xs font-bold text-zinc-900">{step.title}</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">{step.description}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400 font-mono">
                    Step {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Uploaded Assets & Signed Agreement Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs">
                <Upload size={14} />
                <span>Uploaded Media & Assets</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                {currentForm.uploadedAssetsCount} brand files, SVGs, and color palettes ready for design.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs">
                <FileCheck size={14} className="text-emerald-600" />
                <span>Master Services Agreement (MSA)</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                {currentForm.hasSignedAgreement
                  ? 'Digital signature verified by client.'
                  : 'Awaiting client electronic sign-off.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
