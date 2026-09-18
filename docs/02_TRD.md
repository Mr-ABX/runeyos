# 🛠️ Technical Requirements Document (TRD)

> **Project Name:** RuneyOS - Open Source Project & Business Management OS  
> **Architecture:** Fullstack Modern Web Application (Next.js 15 App Router + React 19)  
> **Target Runtime:** Node.js 20+ / Bun 1.1+ / Docker Container  
> **Primary Database:** PostgreSQL (Production / Cloud) & SQLite (Local Zero-Config Development) via Prisma ORM  

---

## ⚙️ 1. Architecture & Technology Stack Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 RUNEYOS SYSTEM TOPOLOGY                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│   [ Client Browser / Mobile PWA ]                                                      │
│     │                                                                                  │
│     ├── Apple-Style Liquid Glass UI (Tailwind CSS v4 + Framer Motion + Radix UI)       │
│     ├── Ambient Global State (Zustand: Floating Timer, Pill Sidebar, Date Filter)      │
│     └── Server Components + React 19 Server Actions                                    │
│                                                                                        │
│   [ Next.js 15 App Router Backend Layer ]                                              │
│     │                                                                                  │
│     ├── Route Handlers & Server Actions (Node.js / Edge Runtime)                       │
│     ├── Authentication & RBAC (NextAuth.js / Auth.js with JWT + Session Cookies)       │
│     ├── Tokenized Portal Verifier (`/portal/[token]` with crypto timing-safe check)    │
│     └── Stripe Payment Engine (Stripe Connect Checkout & Webhook Handlers)             │
│                                                                                        │
│   [ Persistence & Storage Layer ]                                                      │
│     │                                                                                  │
│     ├── Prisma ORM (Type-safe client with schema migrations)                           │
│     ├── PostgreSQL 16+ (Production / Cloud / Supabase) or SQLite (Local Self-Host)     │
│     └── Local/S3 Asset Storage for Invoices, Proposals & Deliverables                  │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.1 Core Technology Selection & Rationale

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15 (App Router) + React 19** | Fast SSR for SEO-critical portal/invoice links, streaming Server Components, and zero-API boilerplate Server Actions. |
| **Styling & Design Tokens** | **Tailwind CSS v4 + Custom Glass System** | CSS-first configuration, native OKLCH colors, ultra-fast JIT compiler, and frosted glass utilities. |
| **Motion & Physics** | **Framer Motion 12+** | Apple-like spring physics for floating pill sidebar expansion, calendar bar inertia scrolling, and drag-and-drop Kanban. |
| **State Management** | **Zustand** | Lightweight store for active time tracker tick, sidebar collapsed state, and selected calendar date. |
| **Database & ORM** | **Prisma ORM + PostgreSQL / SQLite** | Type-safe migrations, auto-generated TypeScript types, support for self-hosted SQLite and enterprise Postgres. |
| **Authentication** | **NextAuth.js (Auth.js v5)** | Secure session cookies, OAuth (Google/GitHub), and email passwordless magic links. |
| **Payments** | **Stripe Connect & Webhooks** | Generates hosted Stripe Checkout sessions for client invoices and handles instant status updates. |
| **Document Export** | **`@react-pdf/renderer` + HTML Canvas** | High-fidelity, vector-crisp PDF generation for invoices, estimates, and project summaries. |
| **Icons & Micro-UI** | **Lucide React + Radix UI Primitives** | Accessible dialogs, dropdowns, tooltips, and consistent Apple-style iconography. |

---

## 🔌 2. API & Server Actions Endpoint Contracts

### 2.1 Authentication & Workspace
```text
POST /api/v1/auth/register
  Request:  { email: string, password: string, name: string, workspaceName: string }
  Response: { success: boolean, userId: string, workspaceId: string }

POST /api/v1/auth/login
  Request:  { email: string, password: string }
  Response: { success: boolean, token: string, user: { id, email, name, role } }
```

### 2.2 Projects & Kanban Tasks
```text
GET  /api/v1/projects
  Headers:  Bearer <token>
  Response: { projects: Array<{ id, name, clientName, color, status, totalTasks, progressPercent }> }

POST /api/v1/projects
  Request:  { name: string, clientId?: string, description?: string, budget?: number, deadline?: string }
  Response: { id: string, name: string, createdAt: string }

GET  /api/v1/projects/:id/tasks
  Response: {
    columns: [
      { id: "backlog", title: "Backlog", tasks: [] },
      { id: "in_progress", title: "In Progress", tasks: [] },
      { id: "in_review", title: "In Review", tasks: [] },
      { id: "done", title: "Done", tasks: [] }
    ]
  }

PATCH /api/v1/tasks/:id/move
  Request:  { columnId: string, orderIndex: number }
  Response: { success: true, taskId: string, newColumn: string, newOrder: number }
```

### 2.3 Ambient Time Tracker
```text
POST /api/v1/time/start
  Request:  { taskId?: string, projectId?: string, clientId?: string, description: string, hourlyRate: number }
  Response: { timerId: string, startedAt: string, status: "RUNNING" }

POST /api/v1/time/:id/stop
  Request:  { endReason?: string }
  Response: { timerId: string, durationSeconds: number, billableAmount: number, isBilled: false }

GET  /api/v1/time/unbilled
  Response: { unbilledEntries: Array<{ id, description, projectName, clientName, durationSeconds, amount }> }
```

### 2.4 Invoices & Financials
```text
POST /api/v1/invoices
  Request: {
    clientId: string,
    invoiceNumber: string,
    dueDate: string,
    currency: "USD" | "EUR" | "GBP",
    taxRatePercent: number,
    items: Array<{ description: string, quantity: number, unitPrice: number, timeEntryId?: string }>,
    notes?: string
  }
  Response: { invoiceId: string, invoiceNumber: string, totalAmount: number, status: "DRAFT" }

POST /api/v1/invoices/:id/send
  Request:  { sendEmailToClient: boolean }
  Response: { success: true, publicUrl: string, sentAt: string }

GET  /api/v1/invoices/:id/pdf
  Response: Binary Application/PDF stream
```

### 2.5 Zero-Friction Client Portal (Public / Token Protected)
```text
GET  /api/v1/portal/:portalToken
  Security: Crypto token verification (No login required)
  Response: {
    workspace: { agencyName, logoUrl, primaryColor },
    client: { name, company },
    activeProjects: Array<{ id, title, status, progress, milestones: [] }>,
    deliverables: Array<{ id, title, fileUrl, status: "PENDING_APPROVAL" | "APPROVED", submittedAt }>,
    openInvoices: Array<{ id, number, amount, dueDate, stripePaymentUrl }>
  }

POST /api/v1/portal/:portalToken/approve-deliverable
  Request:  { deliverableId: string, feedbackNotes?: string }
  Response: { success: true, approvedAt: string }
```

### 2.6 BYOK AI Engine Contract (Phase 2 Ready)
```text
POST /api/v1/settings/ai-key
  Request:  { provider: "openai" | "anthropic" | "gemini" | "groq", apiKey: string }
  Response: { success: true, provider: string, maskedKey: "sk-...4x9q" }
  Storage:  Encrypted at rest using AES-256-GCM server secret.
```

---

## 🎨 3. Liquid Glass UI Implementation Architecture

### 3.1 Custom Tailwind CSS Token Definitions
```css
/* Apple Liquid Glass Utility Tokens */
.glass-panel {
  background: rgba(24, 24, 27, 0.65);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.glass-pill {
  background: rgba(39, 39, 42, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.glass-highlight {
  box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
}
```

### 3.2 Floating Pill Navigation State Architecture
```typescript
// Zustand Store for Floating Sidebar State
interface NavState {
  isCollapsed: boolean;
  activeRoute: string;
  toggleSidebar: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
  isCollapsed: false,
  activeRoute: "/dashboard",
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setCollapsed: (isCollapsed) => set({ isCollapsed }),
}));
```

---

## 🛡️ 4. Non-Functional & Security Architecture

1. **Sub-200ms TTFB**: High-efficiency database indexing on `workspaceId`, `clientId`, and `portalToken`.
2. **Timing-Safe Portal Verification**: Tokens verified using `crypto.timingSafeEqual()` to eliminate timing attack vectors.
3. **Encrypted BYOK Storage**: API keys encrypted via AES-256 before disk writes.
4. **Offline Resilience**: Zustand local storage persistence for active timers so closing a browser tab does not kill active time logs.
