import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  Hash,
  Users,
  Video,
  Phone,
  Search,
  MoreVertical,
  ShieldCheck,
  Zap,
  Lock,
  CheckCheck,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: string;
  attachments?: string[];
  isMe?: boolean;
}

export const RuneyTeamChat: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('#general');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: {
        name: 'Sofia Andersson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        role: 'Client Lead',
      },
      content: 'Hey team! The client just reviewed invoice INV-004 for €8,500 and settled it via Stripe.',
      timestamp: '10:24 AM',
    },
    {
      id: 'm2',
      sender: {
        name: 'Julian Reed',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        role: 'Lead Designer',
      },
      content: 'Awesome! I pushed the new Apple Liquid Glass tokens and the dark mode task is marked in Review.',
      timestamp: '10:26 AM',
    },
    {
      id: 'm3',
      sender: {
        name: 'Solt Wagner',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        role: 'Studio Founder',
      },
      content: 'Great work! Let us finalize the SOW for the next mobile sprint today.',
      timestamp: '10:30 AM',
      isMe: true,
    },
  ]);

  const channels = [
    { id: '#general', name: 'general', unread: 0 },
    { id: '#project-analytics', name: 'project-analytics', unread: 2 },
    { id: '#design-system', name: 'design-system', unread: 0 },
    { id: '#invoicing-ops', name: 'invoicing-ops', unread: 0 },
  ];

  const directMessages = [
    { id: 'dm1', name: 'Sofia Andersson', status: 'online', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 'dm2', name: 'Julian Reed', status: 'online', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 'dm3', name: 'Alex Rivera', status: 'offline', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: {
        name: 'Solt Wagner',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        role: 'Studio Founder',
      },
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, newMsg]);
    setInputMessage('');
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-20">
      {/* Top Banner explaining Zero-Cost Free Chat Architecture */}
      <div className="bg-white rounded-3xl p-5 border border-zinc-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center shadow-md">
            <MessageSquare size={20} className="text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-zinc-900 tracking-tight">RuneyOS Team & Client Chat</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                100% Free / Self-Hostable
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Built on WebSockets & WebRTC peer-to-peer / Matrix protocol. Zero third-party fees, full end-to-end privacy.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
            <Lock size={13} className="text-emerald-600" />
            <span>Encrypted Channels</span>
          </div>
        </div>
      </div>

      {/* Main Chat Interface Container */}
      <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden grid grid-cols-1 md:grid-cols-4 h-[calc(100vh-210px)] min-h-[520px]">
        {/* Left Column: Channels & Direct Messages (1 col) */}
        <div className="border-r border-zinc-200/70 p-4 flex flex-col justify-between bg-zinc-50/50">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Jump to conversation..."
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Channels List */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-1">
                Channels
              </p>
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeChannel === ch.id
                      ? 'bg-black text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Hash size={14} className={activeChannel === ch.id ? 'text-white' : 'text-zinc-400'} />
                    <span>{ch.name}</span>
                  </div>
                  {ch.unread > 0 && (
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {ch.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Direct Messages List */}
            <div className="space-y-1 pt-2 border-t border-zinc-200/60">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-1">
                Direct Messages
              </p>
              {directMessages.map((dm) => (
                <button
                  key={dm.id}
                  onClick={() => setActiveChannel(`@${dm.name}`)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    activeChannel === `@${dm.name}`
                      ? 'bg-black text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <img src={dm.avatar} alt={dm.name} className="w-5 h-5 rounded-full object-cover" />
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${
                          dm.status === 'online' ? 'bg-emerald-500' : 'bg-zinc-300'
                        }`}
                      />
                    </div>
                    <span className="truncate">{dm.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-zinc-200/70 text-[11px] text-zinc-500 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-zinc-900">
              <Zap size={13} className="text-emerald-500" />
              <span>Free Self-Host Hub</span>
            </div>
            <p>Connects directly to PocketBase, Supabase Realtime, or P2P WebRTC.</p>
          </div>
        </div>

        {/* Right Column: Active Conversation (3 cols) */}
        <div className="md:col-span-3 flex flex-col justify-between h-full bg-white">
          {/* Conversation Header */}
          <div className="px-5 py-3.5 border-b border-zinc-200/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash size={17} className="text-zinc-500" />
              <div>
                <h3 className="text-sm font-bold text-zinc-900">{activeChannel}</h3>
                <p className="text-[10px] text-zinc-400">4 team members active • End-to-end encrypted</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-colors"
                title="Start Video Huddle"
              >
                <Video size={14} />
              </button>
              <button
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-colors"
                title="Voice Call"
              >
                <Phone size={14} />
              </button>
              <button
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-colors"
                title="Channel Details"
              >
                <MoreVertical size={14} />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <img
                  src={msg.sender.avatar}
                  alt={msg.sender.name}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-200 shadow-xs"
                />
                <div className={`space-y-1 max-w-[70%] ${msg.isMe ? 'items-end text-right' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 text-[11px] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="font-bold text-zinc-900">{msg.sender.name}</span>
                    <span className="text-[10px] text-zinc-400">{msg.timestamp}</span>
                  </div>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.isMe
                        ? 'bg-black text-white rounded-tr-none'
                        : 'bg-zinc-100 text-zinc-800 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-200/70 bg-white">
            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-black/5 focus-within:border-zinc-400 transition-all">
              <button
                type="button"
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-200/50"
                title="Attach Document or Image"
              >
                <Paperclip size={16} />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message ${activeChannel}...`}
                className="flex-1 text-xs bg-transparent border-none focus:outline-none text-zinc-900 placeholder-zinc-400"
              />
              <button
                type="button"
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-200/50"
                title="Add Emoji"
              >
                <Smile size={16} />
              </button>
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-8 h-8 rounded-xl bg-black hover:bg-zinc-800 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-xs shrink-0"
              >
                <Send size={13} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
