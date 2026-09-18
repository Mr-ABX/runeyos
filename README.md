# ⚡ RuneyOS - Open Source Project & Business Management OS

> **Inspired by [Runey.app](https://runey.app)** | Elevated with **Apple-style Liquid Glass UI**, **Floating Pill Navigation**, and **Open-Core Architecture**.

---

## 🌟 Executive Overview

**RuneyOS** is a modern, open-source, all-in-one business operating system tailored for **freelancers, creative studios, consultants, and boutique digital agencies**. It unifies project management, time tracking, client CRM, proposal/invoicing, and tokenized client portals into an ultra-clean, keyboard-first dashboard.

### 🎨 Apple-Style Liquid Glass Design Language
* **Floating Pill Navigation**: Dynamic floating sidebar with dual-state animation (compact icon pill $\leftrightarrow$ expanded glass drawer).
* **Liquid Glass Calendar Bar**: Horizontally scrollable date strip with frosted Gaussian blur (`backdrop-blur-xl`), day/week timeline previews, deadline indicators, and glowing active-date indicators.
* **Floating Time Tracking Dock**: Ambient persistent widget to log billable hours in 1 click, syncing directly to invoice line items.
* **Tactile Micro-Interactions**: Smooth spring physics (Framer Motion / Tailwind CSS v4) with crisp borders (`border-white/10`) and deep dark mode aesthetics.

---

## 🗺️ Strategic Architecture & Monetization Mindmap

```
                                  ┌────────────────────────────────────────┐
                                  │          RUNEYOS ECOSYSTEM             │
                                  └──────────────────┬─────────────────────┘
                                                     │
         ┌───────────────────────────────────────────┼───────────────────────────────────────────┐
         ▼                                           ▼                                           ▼
┌───────────────────────────────┐   ┌───────────────────────────────┐   ┌───────────────────────────────┐
│   1. OPEN-CORE (SELF-HOSTED)  │   │   2. MANAGED CLOUD SAAS       │   │   3. LIFETIME DEAL (LTD)      │
├───────────────────────────────┤   ├───────────────────────────────┤   ├───────────────────────────────┤
│ • 100% Free & Open Source     │   │ • $9/mo Solo / $24/mo Agency  │   │ • One-time $79 / $149 license │
│ • Docker / SQLite / Postgres  │   │ • Zero-config cloud sync      │   │ • Self-hosted pro license     │
│ • Full Data Sovereignty       │   │ • Automated backups & SSL     │   │ • Lifetime updates & perks    │
│ • Bring-Your-Own-Key (BYOK)   │   │ • Managed AI credits & proxy  │   │ • Great for early cashflow    │
│   for Phase 2 AI Features     │   │ • Multi-tenant team auth      │   │ • User provides own AI key    │
└───────────────────────────────┘   └───────────────────────────────┘   └───────────────────────────────┘
```

---

## 📚 Complete Pre-Vibe-Coding Documentation Suite

All foundational specifications have been generated and structured prior to implementation:

| File | Document | Purpose & Description |
| :--- | :--- | :--- |
| [`docs/01_PRD.md`](file:///Volumes/WORK/ABX-2%20(CODE%20AND%20PROJECTS)/Antigravity%20Projects-02/-%20POJECTS%20&%20CHATS/RuneyOS%20-%20Open%20Source%20Project%20Management/docs/01_PRD.md) | **Product Requirements Document (PRD)** | CPO-grade product vision, target personas, MVP user stories, monetization analysis, and V1 boundaries. |
| [`docs/02_TRD.md`](file:///Volumes/WORK/ABX-2%20(CODE%20AND%20PROJECTS)/Antigravity%20Projects-02/-%20POJECTS%20&%20CHATS/RuneyOS%20-%20Open%20Source%20Project%20Management/docs/02_TRD.md) | **Technical Requirements Document (TRD)** | Next.js 15, React 19, Tailwind v4, Prisma/PostgreSQL, Magic Link auth, and API endpoint contracts. |
| [`docs/03_UX_STATE.md`](file:///Volumes/WORK/ABX-2%20(CODE%20AND%20PROJECTS)/Antigravity%20Projects-02/-%20POJECTS%20&%20CHATS/RuneyOS%20-%20Open%20Source%20Project%20Management/docs/03_UX_STATE.md) | **UX State Machine & Screen Flows** | Mermaid user journey maps, pill sidebar states, liquid calendar bar, loading skeletons, and empty states. |
| [`docs/04_ERD.md`](file:///Volumes/WORK/ABX-2%20(CODE%20AND%20PROJECTS)/Antigravity%20Projects-02/-%20POJECTS%20&%20CHATS/RuneyOS%20-%20Open%20Source%20Project%20Management/docs/04_ERD.md) | **Database Schema & ERD Model** | Relational data schema (SQL DDL), foreign keys, indexes, and tokenized client portal schemas. |
| [`docs/05_CONTEXT.md`](file:///Volumes/WORK/ABX-2%20(CODE%20AND%20PROJECTS)/Antigravity%20Projects-02/-%20POJECTS%20&%20CHATS/RuneyOS%20-%20Open%20Source%20Project%20Management/docs/05_CONTEXT.md) | **AI Agent Execution Contract** | Strict rules for AI vibe coding (TypeScript strictness, styling standards, banned packages). |

### 🛠️ GitHub SpecKit Specifications
* [`specs/001-runeyos-core/spec.md`](file:///Volumes/WORK/ABX-2%20(CODE%20AND%20PROJECTS)/Antigravity%20Projects-02/-%20POJECTS%20&%20CHATS/RuneyOS%20-%20Open%20Source%20Project%20Management/specs/001-runeyos-core/spec.md): SpecKit formal requirements and acceptance scenarios.
* [`specs/001-runeyos-core/plan.md`](file:///Volumes/WORK/ABX-2%20(CODE%20AND%20PROJECTS)/Antigravity%20Projects-02/-%20POJECTS%20&%20CHATS/RuneyOS%20-%20Open%20Source%20Project%20Management/specs/001-runeyos-core/plan.md): SpecKit technical implementation plan.
* [`specs/001-runeyos-core/quickstart.md`](file:///Volumes/WORK/ABX-2%20(CODE%20AND%20PROJECTS)/Antigravity%20Projects-02/-%20POJECTS%20&%20CHATS/RuneyOS%20-%20Open%20Source%20Project%20Management/specs/001-runeyos-core/quickstart.md): Runnable verification and quickstart guide.
* [`specs/001-runeyos-core/checklists/requirements.md`](file:///Volumes/WORK/ABX-2%20(CODE%20AND%20PROJECTS)/Antigravity%20Projects-02/-%20POJECTS%20&%20CHATS/RuneyOS%20-%20Open%20Source%20Project%20Management/specs/001-runeyos-core/checklists/requirements.md): Quality and readiness checklist.

---

## ⚡ Core Feature Modules

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   RUNEYOS DASHBOARD                                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  [📅 Liquid Calendar Bar]  Mon 18  [Tue 19]  Wed 20  Thu 21  Fri 22  Sat 23  Sun 24    │
├───────────────────┬────────────────────────────────────────────────────────────────────┤
│ [💊 Pill Sidebar] │ [🗂️ Kanban Board & Tasks]    [⏱️ Billable Time Tracker Pill]        │
│   • Dashboard     │   • Backlog / In Progress      • 01:42:15 Active Timer (Acme Corp) │
│   • Projects      │   • Review / Completed         • Convert Time -> Invoice Line Item │
│   • Clients (CRM) ├──────────────────────────────┬─────────────────────────────────────┤
│   • Invoicing     │ [💼 Client Portal Hub]       │ [📊 Cash Flow & Financials]         │
│   • Time Tracker  │   • Tokenized Magic Links    │   • Outstanding Invoices: $4,850    │
│   • Analytics     │   • Real-Time Approvals      │   • Net Monthly Revenue: $18,200    │
│   • [AI Tools 🔒] │   • Secure Asset Uploads     │   • Billable Hours: 142.5 hrs       │
└───────────────────┴──────────────────────────────┴─────────────────────────────────────┘
```
