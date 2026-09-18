# SpecKit Technical Architecture & Implementation Plan: RuneyOS Core

> **Feature Directory:** `specs/001-runeyos-core/`  
> **Target Framework:** Next.js 15 App Router / React 19 / TypeScript / Tailwind CSS v4 / Prisma ORM  
> **Status:** Ready for Execution  

---

## 🏛️ 1. Technical Architecture & Component Tree

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                  # Floating Pill Sidebar + Liquid Glass Calendar Bar
│   │   ├── dashboard/page.tsx          # Overview, Revenue, Active Tasks & Agenda
│   │   ├── projects/
│   │   │   ├── page.tsx                # Projects List & Grid View
│   │   │   └── [id]/page.tsx           # Interactive Kanban Board & Task Inspector
│   │   ├── clients/
│   │   │   ├── page.tsx                # Client CRM Directory & Financial Ledgers
│   │   │   └── [id]/page.tsx           # Client Profile, History & Portal Generator
│   │   ├── invoices/
│   │   │   ├── page.tsx                # Invoices & Quotes Table with Status Filters
│   │   │   └── new/page.tsx            # Invoice Builder Studio (Time-to-Invoice)
│   │   ├── time/page.tsx               # Full Timesheet & Unbilled Hours View
│   │   └── settings/page.tsx           # Workspace Settings & BYOK AI Vault
│   ├── portal/
│   │   └── [token]/page.tsx            # Zero-Friction Client Portal (No Login)
│   └── api/
│       ├── v1/projects/route.ts
│       ├── v1/tasks/route.ts
│       ├── v1/time/route.ts
│       ├── v1/invoices/route.ts
│       └── v1/portal/[token]/route.ts
├── components/
│   ├── ui/                             # Radix UI + Apple Liquid Glass Primitives
│   │   ├── glass-panel.tsx
│   │   ├── glass-button.tsx
│   │   └── glass-dialog.tsx
│   ├── navigation/
│   │   ├── floating-pill-sidebar.tsx   # Dual-State Pill Dock (72px <-> 240px)
│   │   └── liquid-calendar-bar.tsx     # Horizontal Scrollable Glass Date Strip
│   ├── kanban/
│   │   ├── board.tsx
│   │   ├── column.tsx
│   │   └── task-card.tsx
│   ├── time-tracker/
│   │   └── ambient-timer-dock.tsx      # Floating Persistent Pill Timer Widget
│   └── invoices/
│       ├── invoice-builder.tsx
│       └── pdf-preview.tsx
├── lib/
│   ├── prisma.ts                       # Prisma Client Instance
│   ├── stripe.ts                       # Stripe Connect Client
│   └── crypto.ts                       # Token Generation & AES-256 Vault
└── stores/
    ├── use-nav-store.ts                # Sidebar Collapse State
    ├── use-timer-store.ts              # Ambient Time Tracker Live State
    └── use-calendar-store.ts           # Selected Date Filter
```

---

## ⚡ 2. Implementation Execution Phases

### Phase 1: Foundation & Liquid Glass Design System
* Initialize Next.js 15 App Router project with Tailwind CSS v4, Lucide React, and Framer Motion.
* Implement the custom Apple Liquid Glass design tokens (blur panels, specular highlights, dark obsidian theme).
* Build the `FloatingPillSidebar` (dual-state expansion) and the `LiquidCalendarBar` (horizontal inertia scrolling).

### Phase 2: Database Layer & Domain Logic
* Configure Prisma ORM with PostgreSQL and SQLite support.
* Implement database migrations for Workspaces, Users, Clients, Projects, Tasks, and TimeEntries.
* Build the interactive drag-and-drop Kanban Board (`@hello-pangea/dnd` or Framer Motion drag).
* Build the `AmbientTimerDock` with persistent Zustand store and 1-click start/stop.

### Phase 3: Invoicing Engine, Stripe & Client Portal
* Build the Invoicing Builder Studio with automated conversion of unbilled time entries into line items.
* Implement Stripe Connect hosted checkout sessions for client invoice payments.
* Build the tokenized `/portal/[token]` public route with timing-safe verification for client deliverable review and milestone sign-offs.

### Phase 4: BYOK AI Interface & Quality Verification
* Build the BYOK Settings view with AES-256 encrypted API key vault.
* Integrate the "AI Studio - Coming Soon" interactive preview panel.
* Execute end-to-end user flow verification.
