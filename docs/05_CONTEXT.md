# 🔒 AI Agent Execution Context Contract (`CONTEXT.md` / `RULES.md`)

> **Project Name:** RuneyOS - Open Source Project & Business Management OS  
> **Target AI Engines:** Antigravity, Claude Code, Cursor, GitHub Copilot  
> **Purpose:** Injected into coding agents before code generation to enforce strict architectural rules, Apple Liquid Glass design standards, forbidden packages, and type boundaries.

---

## ⛔ 1. Forbidden Patterns (Strictly Banned)

1. **Zero `any` Types:** Strict TypeScript configuration (`"strict": true`, `"noImplicitAny": true`). All Server Actions, API routes, and React props must use explicit interfaces or Zod schemas.
2. **No Unapproved Heavy Dependencies:**
   - ❌ Do NOT install heavy component libraries like Material UI, Ant Design, or Bootstrap.
   - ✅ Only use **Tailwind CSS v4**, **Radix UI Primitives**, **Lucide React**, and **Framer Motion**.
3. **No Raw Un-Sanitized SQL or Dynamic Strings:** All queries must execute through Prisma ORM or parameterized transactions.
4. **No Giant Monolithic Files:** Keep individual React components and route handlers under **200 lines**. Decompose complex modals into subcomponents (`Header`, `Body`, `Actions`, `Skeletons`).
5. **No Direct Firebase Imports:** Do NOT install `@firebase/app` or Firebase SDKs for core business data; RuneyOS relies on PostgreSQL / SQLite via Prisma.

---

## 🎨 2. Apple Liquid Glass UI & Design Rules

1. **Glassmorphism Spec**:
   - Panels: `backdrop-blur-2xl bg-zinc-900/60 border border-white/10 shadow-2xl rounded-2xl`
   - Floating Pills: `backdrop-blur-xl bg-zinc-800/80 border border-white/15 rounded-full shadow-lg`
   - Active Glow: `ring-1 ring-cyan-500/40 bg-white/10 shadow-[0_0_20px_rgba(6,182,212,0.2)]`
2. **Floating Pill Navigation Sidebar**:
   - Must support dual-state animation: `collapsed` (72px width icon dock) $\leftrightarrow$ `expanded` (240px width glass drawer).
   - Use Framer Motion spring physics (`stiffness: 350, damping: 28`).
3. **Liquid Glass Calendar Bar**:
   - Must render horizontally scrollable 30-day date strip at the top of the dashboard.
   - Today's date must default to active with liquid cyan glow.
4. **Floating Time Tracker Dock**:
   - Must persist in a floating bottom-right pill across page navigation.
   - Zustand store must synchronize with `localStorage` to survive page reloads.

---

## 🛡️ 3. Defensive UI & Error Boundary Rules

* **Skeleton Loaders Mandatory**: Every route with asynchronous data loading must export a matching `loading.tsx` featuring shimmer pulse skeletons.
* **Empty State First**: Every collection view (Kanban, Invoices, Clients, Time Logs) must have a dedicated empty state UI featuring a custom Lucide icon, helpful explanation, and primary "+ Create" CTA button.
* **Error Toast Boundaries**: All mutations and Server Actions must return a standardized result:
  ```typescript
  export type ActionResult<T> = 
    | { success: true; data: T; message?: string }
    | { success: false; error: string; code?: string };
  ```
* **Client Portal Token Security**: Public access to `/portal/[token]` must use `crypto.timingSafeEqual` or indexed lookups with zero user authentication requirements for the client.

---

## 🚀 4. Feature Scope Boundaries for V1

* **AI Features**: Render the **"AI Studio - Coming Soon"** glass preview and the BYOK (Bring-Your-Own-Key) input setting, but do NOT implement live AI streaming inference in V1.
* **Payments**: Stripe Connect checkout sessions for invoices are supported; manual bank transfer receipts can also be marked as paid.
