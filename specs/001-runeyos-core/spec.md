# SpecKit Feature Specification: RuneyOS Core System

> **Feature Directory:** `specs/001-runeyos-core/`  
> **Status:** Approved for Technical Planning  
> **Target Audience:** Freelancers, Agency Founders, Creative Studios, and Direct Clients  

---

## 📖 1. Feature Overview & Problem Context

RuneyOS is an open-source, all-in-one business operating system consolidating project tracking, time logging, client management, invoicing, and zero-friction client collaboration.

Traditional solutions suffer from multi-app fragmentation, high per-seat monthly subscription taxes, and client onboarding friction. RuneyOS resolves these barriers through an Apple-grade Liquid Glass UI design system, tokenized magic-link client portals, and an open-core self-hostable architecture.

---

## 🎯 2. User Scenarios & Acceptance Criteria

### Scenario 1: Floating Ambient Time Tracker & Invoice Generation
* **Given** a user is working on a client project named "Acme Brand Refresh",
* **When** the user clicks the floating ambient timer pill in the bottom dock and selects "Design System",
* **Then** the timer begins counting up in real-time, persisting across page navigation,
* **And When** the user stops the timer after 2 hours and navigates to the Invoices tab,
* **Then** the user can click "Create Invoice from Unbilled Time", which automatically populates an itemized invoice with the 2-hour duration multiplied by the client's hourly rate (\$125/hr = \$250).

### Scenario 2: Zero-Friction Client Portal Collaboration
* **Given** an agency has uploaded a final logo deliverable and created a project milestone,
* **When** the agency founder copies the client's tokenized portal URL (`/portal/c_9x2k41`) and shares it,
* **Then** the client can open the URL on mobile or desktop without creating an account or logging in,
* **And** the client can view project progress, approve deliverables, and click the Stripe payment button to pay the open invoice immediately.

### Scenario 3: Liquid Glass Calendar Header & Daily Agenda
* **Given** a user has multiple tasks with deadlines on Friday the 22nd,
* **When** the user views the main dashboard header and clicks "Fri 22" on the horizontal calendar bar,
* **Then** the date pill highlights with a frosted cyan liquid glow,
* **And** the dashboard agenda filters dynamically to show tasks and milestones due on that specific date.

---

## 📋 3. Functional Requirements

### 3.1 Apple Liquid Glass Navigation
* **REQ-NAV-1**: The system must provide a floating sidebar with spring physics supporting both collapsed icon pill mode (72px) and expanded glass drawer mode (240px).
* **REQ-NAV-2**: The system must provide a 30-day horizontal liquid glass calendar bar in the dashboard header with inertia scrolling and active date indicators.

### 3.2 Task & Project Management
* **REQ-TASK-1**: The system must render an interactive drag-and-drop Kanban board with 4 default columns (`Backlog`, `In Progress`, `In Review`, `Done`).
* **REQ-TASK-2**: Tasks must support priority badges, estimated vs tracked time, due dates, checklists, and project color tags.

### 3.3 Ambient Time Tracking
* **REQ-TIME-1**: The system must feature a persistent floating time tracking dock with 1-click start/stop.
* **REQ-TIME-2**: Tracked time entries must record workspace, project, client, task, and billable rate metadata.

### 3.4 Invoicing & Payments
* **REQ-INV-1**: The system must generate itemized invoices with customizable tax rates, currency symbols, and notes.
* **REQ-INV-2**: The system must support Stripe Connect checkout links for client payments and export vector-crisp PDF documents.

### 3.5 Client CRM & Tokenized Portals
* **REQ-CRM-1**: The system must maintain a unified directory of clients, company details, default rates, and historical billings.
* **REQ-PORTAL-1**: The system must generate secure, tokenized URLs (`/portal/[token]`) enabling clients to view deliverables and pay invoices without account registration.

---

## 🏆 4. Success Criteria

1. **Client Frictionless Access**: $100\%$ of client portal views load in $< 1$ second without prompting for user registration.
2. **Invoice Generation Speed**: Converting 5 unbilled time logs into a completed invoice takes $< 30$ seconds.
3. **UI Animation Performance**: Floating pill expansion and Kanban card drag-and-drop maintain a consistent 60fps frame rate.
4. **Data Integrity**: $100\%$ of financial line items and time logs maintain strict relational integrity across workspaces.
