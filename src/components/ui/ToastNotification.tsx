'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useRuneyStore } from '@/lib/store';

export const ToastNotification: React.FC = () => {
  const { toastMessage, clearToast } = useRuneyStore();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-panel rounded-full px-5 py-2.5 border border-white/20 shadow-2xl flex items-center gap-3"
        >
          <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
            <Sparkles size={12} />
          </div>
          <span className="text-xs font-semibold text-white tracking-tight">{toastMessage}</span>
          <button
            onClick={clearToast}
            className="w-5 h-5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={12} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
