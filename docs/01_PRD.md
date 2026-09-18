# 📋 Product Requirements Document (PRD)

> **Project Name:** RuneyOS - Open Source Project & Business Management OS  
> **Status:** Approved / Pre-Development  
> **Design Aesthetic:** Apple-Inspired Liquid Glass UI / Dark Mode / Floating Pill Navigation  
> **Primary Stakeholder:** Lead Architect & CPO  

---

## 🎯 1. Executive Summary & Problem Statement

### 1.1 The Problem
Freelancers, creative studios, and boutique digital agencies are currently plagued by **software fragmentation and extortionate per-seat SaaS subscription pricing**:
* **Tool Sprawl**: Teams juggle 4 to 6 separate tools (e.g., Trello/Linear for tasks, Harvest/Toggl for time tracking, QuickBooks/Bonsai for invoicing, Notion for client briefs, Dropbox/WeTransfer for deliverable delivery).
* **Subscription Fatigue & Per-Seat Tax**: Established all-in-one SaaS tools charge \$20–\$45/user/month, becoming prohibitively expensive as agencies bring on contractors and team members.
* **Client Friction**: Requiring clients to create yet another account to view a project board or approve an invoice leads to abandoned onboarding and delayed client feedback.
* **Data Lock-in**: Sensitive client rates, billing history, and proprietary project briefs are held in closed proprietary databases without direct export or self-hosting freedom.

### 1.2 The Solution: RuneyOS
**RuneyOS** is an open-source, self-hostable all-in-one business operating system inspired by the workflow simplicity of [Runey.app](https://runey.app), elevated with an **Apple-grade Liquid Glass UI design system**.

RuneyOS unifies:
1. **Interactive Kanban & Project Workspaces**
2. **Floating Ambient Time Tracker** (with automatic time-to-invoice conversion)
3. **Client CRM & Relationship Directory**
4. **Professional Invoice, Quote & Proposal Generator** (with Stripe checkout & PDF export)
5. **Zero-Friction Tokenized Client Portals** (clients review deliverables via secure magic links without creating an account)
6. **Liquid Glass Date & Timeline Bar** (horizontally scrolling calendar header for daily agenda and deadline triage)
7. **Modular BYOK (Bring-Your-Own-Key) AI Architecture** *(Phase 2 / Coming Soon)* for private, self-hosted AI assistance with zero token markups.

---

## 💡 2. Monetization Strategy, Database Choice & Strategic Mindmap

```
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       RUNEYOS MONETIZATION MATRIX                                         │
├──────────────────────────────┬──────────────────────────────────────────┬─────────────────────────────────┤
│ Tier / Model                 │ Target Audience                          │ Commercial Value & Strategy     │
├──────────────────────────────┼──────────────────────────────────────────┼─────────────────────────────────┤
│ **1. Open-Core (Self-Host)** │ Tech-savvy freelancers, privacy devs     │ 100% Free MIT/AGPL. Docker /    │
│                              │                                          │ Supabase deploy, BYOK AI.       │
├──────────────────────────────┼──────────────────────────────────────────┼─────────────────────────────────┤
│ **2. Managed Cloud SaaS**    │ Non-technical agencies, creative studios │ $9/mo Solo / $24/mo Agency.     │
│                              │                                          │ Zero-config cloud, auto backups.│
├──────────────────────────────┼──────────────────────────────────────────┼─────────────────────────────────┤
│ **3. Lifetime Deal (LTD)**   │ Early adopters, AppSumo community        │ $79 (Solo) / $149 (Studio) LTD. │
│                              │                                          │ Bootstraps early cash flow.     │
└──────────────────────────────┴──────────────────────────────────────────┴─────────────────────────────────┘
```

### 2.1 Why PostgreSQL / SQLite vs. Firebase?
* **Relational Integrity for Financial Records**: Invoices, tax rates, currency conversions, client associations, and time entries require strict ACID transactions, foreign keys, and relational integrity. NoSQL/Firebase easily causes orphaned documents and complex multi-path updates.
* **True Self-Hosting & Portability**: PostgreSQL and SQLite can run anywhere (local Docker container, VPS, Coolify, Railway, Supabase, or local embedded SQLite). Firebase ties the project directly to Google Cloud infrastructure.
* **Client Sharing via Tokenized Magic Links**: Instead of requiring Firebase Auth for clients, RuneyOS generates high-entropy crypto tokens (`nanoid` or UUIDv4) stored in the `ClientPortal` table, allowing clients to instantly open their private branded dashboard in 1 click.

### 2.2 Bring-Your-Own-Key (BYOK) AI Architecture (Phase 2 / Coming Soon)
* Users can input their own OpenAI, Anthropic, Google Gemini, or Groq API keys directly into their local Settings.
* In Cloud SaaS mode, users can either use their own key or buy bundled credits.
* **V1 Status**: In V1, the AI settings panel displays a sleek **"AI Studio - Coming Soon"** glass card with an interactive preview of smart task breakdowns and AI invoice itemization.

---

## 👥 3. Target Personas & Core User Journeys

### Persona A: Julian (Solo Creative / Product Designer)
* **Goal**: Manage 5 concurrent client retainers, track billable hours, and send sleek Apple-style invoices without paying \$30/mo for bloated tools.
* **User Story**: *As a solo designer, I want to click a single floating timer pill while working, and at the end of the week convert those tracked hours into a branded invoice in 2 clicks.*

### Persona B: Sarah (Boutique Agency Founder - 6 Team Members)
* **Goal**: Keep all team projects organized in Kanban boards, view cash flow forecasts, and give clients a white-labeled portal to sign off on milestones.
* **User Story**: *As an agency founder, I want to send my client a secure link where they can view project progress, approve deliverables, and pay invoices without needing to remember a login password.*

### Persona C: Marcus (Corporate Client / Project Sponsor)
* **Goal**: Review Julian's deliverables and pay invoices quickly from a mobile browser.
* **User Story**: *As a client, I want to open a magic link on my phone, view the live project status, and click a Stripe button to pay the invoice instantly.*

---

## 🎨 4. Design System: Apple-Inspired Liquid Glass Aesthetic

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              LIQUID GLASS DESIGN SYSTEM                                │
├──────────────────────────┬─────────────────────────────────────────────────────────────┤
│ **Backdrop & Material**  │ Frosted Gaussian blur (`backdrop-blur-2xl bg-zinc-900/60`) │
│ **Borders & Elevation**  │ Ultra-fine specular highlight (`border border-white/10`)    │
│ **Color Palette**        │ Deep Obsidian `#09090b`, Zinc `#18181b`, Accent Violet/Blue │
│ **Floating Pill Nav**    │ Collapsible floating dock with spring physics               │
│ **Liquid Calendar Bar**  │ Horizontal glass date strip with glowing active date badge  │
│ **Typography**           │ SF Pro / Inter display typography with subtle sub-labels    │
└──────────────────────────┴─────────────────────────────────────────────────────────────┘
```

---

## 🚀 5. MVP Functional Scope (V1 What We Are Building)

### Module 1: Dynamic Floating Pill Sidebar
* **Dual State**:
  - **Collapsed (Floating Icon Pill)**: Minimal vertical dock taking $< 64\text{px}$ width with tooltip popovers.
  - **Expanded (Glass Drawer)**: Expands on hover or toggle to reveal labels, workspace switchers, and quick metrics.
* **Navigation Items**: Dashboard, Projects, Tasks (Kanban), Time Tracker, Clients (CRM), Invoices & Quotes, Financials, Settings, [AI Assistant - Coming Soon].

### Module 2: Liquid Glass Horizontal Calendar Bar
* **Interactive Date Strip**: Horizontally scrollable 30-day view placed prominently in the dashboard header.
* **Visual States**:
  - Current day highlighted with a soft liquid neon glow and glass border.
  - Days with scheduled task deadlines or invoice due dates display colored micro-dots.
  - Clicking any date filters the dashboard agenda for that specific day.

### Module 3: Project & Task Management (Kanban & List)
* **Kanban Board**: Drag-and-drop columns (`Backlog`, `In Progress`, `In Review`, `Done`).
* **Task Card Metadata**: Priority tags (`Urgent`, `High`, `Medium`, `Low`), assigned client, estimated vs tracked time, checklists, and file attachments.
* **Dual View Switcher**: Instant toggle between Kanban Board view and Compact List view.

### Module 4: Ambient Floating Time Tracker Dock
* **Live Timer Pill**: Floating bottom widget that persists across page transitions.
* **One-Click Controls**: Start, Pause, Resume, Stop, and discard timer.
* **Metadata Association**: Link timer to a specific Project, Client, and Task with hourly rate calculation.
* **Time-to-Invoice Bridge**: Filter unbilled time entries and convert them directly into itemized invoice lines.

### Module 5: Client CRM & Relationship Directory
* **Client Profiles**: Company name, contact email, phone, billing address, custom hourly rate, and active projects list.
* **Portal Management**: Generate unique magic-link client portal URLs with optional password protection and expiration dates.
* **Revenue Metrics**: Total revenue generated, outstanding balances, and active contracts.

### Module 6: Invoicing, Quotes & Financials
* **Invoice Builder**: Itemized line items, quantity, hourly rates, discounts, sales tax, notes, and payment terms.
* **Status Lifecycle**: `Draft` $\rightarrow$ `Sent` $\rightarrow$ `Viewed` $\rightarrow$ `Paid` $\rightarrow$ `Overdue`.
* **Stripe Integration**: Connect Stripe account to generate public payment links on client-facing invoices.
* **PDF Export**: Clean, printable PDF invoice generation with custom agency logo and branding.

### Module 7: Zero-Friction Client Portal
* **Tokenized URL Access**: Dedicated view at `/portal/[token]` with no login wall.
* **Client Capabilities**:
  - View overall project progress bar and completed milestones.
  - Review submitted design/code deliverables and submit feedback notes.
  - View and pay open invoices via Stripe.
  - Request new tasks or project briefs.

---

## 🚫 6. Non-Goals (Strictly Out of Scope for V1)

* ❌ **Live Video/Audio Chat** (Use external Zoom/Google Meet links).
* ❌ **Full Accounting Ledger & Double-Entry Bookkeeping** (RuneyOS focuses on invoicing & cash flow, not full CPA tax accounting).
* ❌ **Native Mobile Apps for App Store / Play Store** (V1 is a responsive PWA-ready web application optimized for desktop and mobile Safari/Chrome).
* ❌ **Active AI Execution Engine** (V1 will showcase the UI mockups and settings architecture for BYOK AI, with live inference shipping in Phase 2).

---

## 📈 7. Success Metrics & North Star KPIs

1. **Time-to-First-Invoice**: A new user can register and send their first branded invoice in $< 90$ seconds.
2. **Client Friction Score**: $100\%$ of client portal views and invoice payments require $0$ account registrations.
3. **UI Responsiveness & Performance**: Sub-100ms interaction latency on Kanban card drag-and-drop and timer toggles with 60fps animations.
4. **Self-Hosting Time**: A developer can launch RuneyOS locally via Docker Compose in under 3 minutes (`docker compose up -d`).
