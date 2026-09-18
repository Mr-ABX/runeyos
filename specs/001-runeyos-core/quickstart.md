# 🚀 RuneyOS Quickstart & Verification Guide

> **Feature Directory:** `specs/001-runeyos-core/`  
> **Purpose:** Runnable verification scenarios to validate that all RuneyOS modules function end-to-end.

---

## 💻 1. Local Scaffolding & Quickstart

```bash
# 1. Scaffolding Next.js 15 App with TypeScript & Tailwind CSS
bun create next-app runeyos-app --typescript --tailwind --eslint --app --src-dir

# 2. Install Apple UI & State Dependencies
bun add framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip zustand @prisma/client @react-pdf/renderer nanoid
bun add -D prisma

# 3. Initialize Prisma & Run Migrations
npx prisma init
npx prisma migrate dev --name init_runeyos_schema

# 4. Start Development Server
bun dev
```

---

## 🧪 2. Core Scenario Validation Procedures

### Verification 1: Apple Liquid Glass Pill Sidebar & Calendar Bar
* **Action**: Load `http://localhost:3000/dashboard`.
* **Expected Result**: 
  - Floating pill sidebar appears on the left dock. Clicking the toggle expands it with smooth spring physics (`stiffness: 350`).
  - The top horizontal liquid glass calendar bar allows horizontal scrolling. Clicking a date highlights it with cyan glass luminescence.

### Verification 2: Time-to-Invoice Generation
* **Action**:
  1. Click the floating timer dock in the bottom right and run a timer for 10 seconds under project "Brand Redesign".
  2. Click "Stop".
  3. Navigate to `/invoices/new` and select "Add Unbilled Time".
* **Expected Result**: The 10-second entry appears as a line item calculated against the client's hourly rate.

### Verification 3: Zero-Friction Client Portal
* **Action**:
  1. Navigate to `/clients` and click "Generate Portal Link".
  2. Copy the URL (`/portal/[token]`) and open it in a private/incognito browser window.
* **Expected Result**: The portal loads instantly with $0$ login prompt, displaying the client's deliverables, project milestones, and a Stripe payment button.
