import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RuneyOS - Open Source Project & Business Management OS',
  description:
    'All-in-one project management, time tracking, invoicing, client CRM, and tokenized client portals inspired by Runey.app with Apple Liquid Glass UI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-zinc-100 min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Ambient background glow accents */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
