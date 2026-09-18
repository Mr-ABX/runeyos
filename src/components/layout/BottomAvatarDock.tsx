import React from 'react';
import { useRuneyStore } from '@/store/useRuneyStore';

interface AvatarItem {
  id: string;
  initials?: string;
  avatarUrl?: string;
  name: string;
  bg?: string;
  isRuney?: boolean;
}

const dockAvatars: AvatarItem[] = [
  { id: '1', initials: 'S', name: 'Solt Wagner', bg: 'bg-amber-100 text-amber-800' },
  { id: '2', initials: 'A', name: 'Alex Rivera', bg: 'bg-emerald-100 text-emerald-800' },
  { id: '3', initials: 'Z', name: 'Zoe Vance', bg: 'bg-rose-100 text-rose-800' },
  { id: '4', initials: 'UD', name: 'Urban Design Labs', bg: 'bg-zinc-200 text-zinc-800' },
  { id: '5', isRuney: true, name: 'Runey Studio Core', bg: 'bg-black text-white' },
  { id: '6', initials: 'CM', name: 'Creative Minds Inc.', bg: 'bg-zinc-100 text-zinc-900' },
  { id: '7', initials: '⚡', name: 'Nordic Wave AB', bg: 'bg-black text-white' },
  { id: '8', initials: 'AC', name: 'Apex Corp', bg: 'bg-cyan-100 text-cyan-800' },
  { id: '9', initials: 'AI', name: 'AI Studio Assistant', bg: 'bg-pink-100 text-pink-800' },
  { id: '10', initials: 'SM', name: 'Social Media Pro', bg: 'bg-emerald-100 text-emerald-800' },
  { id: '11', initials: 'W', name: 'Webflow Partner', bg: 'bg-blue-600 text-white' },
  { id: '12', initials: 'DS', name: 'Design System', bg: 'bg-rose-100 text-rose-800' },
  { id: '13', initials: 'W', name: 'Workspace', bg: 'bg-sky-100 text-sky-800' },
];

export const BottomAvatarDock: React.FC = () => {
  const { clients, setSelectedClient, setCurrentTab } = useRuneyStore();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 select-none">
      <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200 shadow-runey-card">
        {dockAvatars.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              const matched = clients.find((c) => c.name.includes(item.name) || item.name.includes(c.name));
              if (matched) setSelectedClient(matched);
              setCurrentTab('clients');
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] transition-transform hover:scale-110 active:scale-95 shadow-xs ${
              item.bg || 'bg-zinc-100 text-zinc-800'
            }`}
            title={item.name}
          >
            {item.isRuney ? (
              <span className="font-extrabold text-xs">R</span>
            ) : (
              item.initials
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
