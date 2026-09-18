# ⚡ RuneyOS — 100% Faithful Runey.app Clone & Open-Source Business OS

> **A pixel-accurate, elevated open-source reproduction of [Runey.app](https://runey.app)** | Built with **Vite + React 18 + TypeScript + Tailwind CSS**, designed for instant web hosting and native standalone desktop packaging (Tauri / Electron).

---

## 🌟 Visual Fidelity & Screenshot-Matched Architecture

RuneyOS is engineered directly against Runey's signature user experience:

1. **Floating Pitch-Black Pill Sidebar (`#0a0a0c`, `rounded-[28px]`)**:
   * Continuous vertical pill floating on the left with brand 'R' top icon, quick-create `+`, 9 module icons with Apple-style hover tooltips, and bottom AI / Settings / Help / Workspace Hexagon switcher.
2. **Top-Center Floating View Switcher Pill**:
   * Instant seamless toggle between Board, List, Time, Invoices, Projects, Onboarding, Clients, and Analytics.
3. **Top Navigation with Ambient Timer (`00:03:48`)**:
   * Persistent top-right live billable timer widget with play/pause/stop, global search trigger (`Cmd+K`), notification bell with 4-unread badge, and user avatar.
4. **Executive Dashboard & Signature Fluid Cashflow Card (€82.6k)**:
   * 4 sparkline metric cards (Revenue €110.8k, Open €28.2k, Invoiced €9.8k, Expenses €1.8k).
   * Large Green Fluid Cashflow Hero Card with gradient wave visuals and real-time cash balance.
   * Balance timeline with client avatars, activities stream, and 99% margin circular health gauge.
5. **Projects & Kanban Board with Task Inspector Slide-Over**:
   * Colorful landscape hero banner with project metadata and team member avatars.
   * 4 status columns with colored indicator dots (*Request*, *To Do*, *In Progress*, *Review*).
   * **Right Slide-Over Task Inspector** with checklist toggles, time tracking logs with hourly costs, additional fee trackers, and export tools.
6. **Client CRM Detail with Horizontal Milestone Timeline**:
   * 5 KPI cards, comprehensive client contact profile header, and horizontal activity calendar timeline with branching milestone pills (`INV-004 sent`, `Customer added`, `Annual Maintenance`, `INV-004 paid`).
7. **Expenses View with Vendor Logo Crowned Bar Chart**:
   * 4 expense KPI cards, spending overview bar chart crowned with Figma, Adobe, Notion, and Uber logos, and grouped chronological expense transactions.
8. **Settings & Integrations Hub**:
   * Settings sub-menu navigation with 1-click connect cards for Stripe, Webhooks, Zapier, PayPal, Notion, and Slack.
9. **Client Onboarding Processor**:
   * Multi-step onboarding builder, shareable portal links, asset dropzone, and digital SOW/agreement sign-off tracker.
10. **Runey AI Studio (BYOK Privacy-First)**:
    * Bring-Your-Own-Key local vault with AES encryption for Anthropic, OpenAI, Gemini, and DeepSeek.
    * Instant project task decomposition engine, client proposal generator, and automated SOW drafter.

---

## 🚀 Quickstart & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized, ultra-fast `dist/` bundle (437 kB JS / 41 kB CSS) ready to deploy on any static host (Cloudflare Pages, Vercel, Netlify) or bundle into a native desktop app.

---

## 🖥️ Packaging as a Standalone Native Desktop App

Because RuneyOS is built with pure client-side **Vite + React**, packaging it into a native desktop app is trivial:

### Option A: Tauri (Rust — Ultra Lightweight ~15MB)
```bash
npm install -D @tauri-apps/cli
npx tauri init
npx tauri build
```

### Option B: Electron
```bash
npm install -D electron electron-builder
# Point Electron main process to dist/index.html
npx electron-builder
```

---

## 📦 Project Structure

```
runeyos/
├── docs/                     # 5 Foundational Pre-Vibe-Coding Specs
│   ├── 01_PRD.md
│   ├── 02_TRD.md
│   ├── 03_UX_STATE.md
│   ├── 04_ERD.md
│   └── 05_CONTEXT.md
├── src/
│   ├── components/
│   │   ├── ai/               # Runey AI Studio & BYOK Key Vault
│   │   ├── analytics/        # Revenue & Workload Analytics
│   │   ├── clients/          # Client CRM & Activity Timeline
│   │   ├── dashboard/        # Executive Dashboard & Fluid Cashflow
│   │   ├── expenses/         # Expenses & Vendor Spending Chart
│   │   ├── invoices/         # Invoices & Billing
│   │   ├── kanban/           # Kanban Board & Task Inspector
│   │   ├── layout/           # Floating Pill Sidebar, TopNav, Center Dock, Avatar Dock
│   │   ├── modals/           # Cmd+K Quick Search Palette
│   │   ├── onboarding/       # Client Onboarding Portals
│   │   ├── projects/         # Project Initiatives Grid
│   │   └── settings/         # Settings & Integrations Hub
│   ├── data/                 # Mock Data Matching Runey Screenshots
│   ├── store/                # Zustand Global State Management
│   ├── types/                # Domain TypeScript Interfaces
│   ├── App.tsx               # Main Application Shell
│   ├── index.css             # Tailwind & Runey Design Tokens
│   └── main.tsx              # React Entrypoint
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License
MIT License — Free and Open Source.
