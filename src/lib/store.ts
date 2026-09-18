import { create } from 'zustand';
import { Project, Task, Client, Invoice, TimeEntry, Deliverable, TaskStatus, TaskPriority } from './types';
import { mockClients, mockProjects, mockTasks, mockTimeEntries, mockInvoices, mockDeliverables } from './mock-data';

export type NavigationTab = 
  | 'dashboard' 
  | 'projects' 
  | 'tasks' 
  | 'time' 
  | 'clients' 
  | 'invoices' 
  | 'portal' 
  | 'ai' 
  | 'settings';

interface TimerState {
  isRunning: boolean;
  seconds: number;
  projectId: string;
  taskId: string;
  clientId: string;
  description: string;
  hourlyRate: number;
}

interface RuneyState {
  // Navigation & View State
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Calendar Filter
  selectedDate: string; // ISO date format YYYY-MM-DD
  setSelectedDate: (date: string) => void;

  // Domain Entities
  projects: Project[];
  tasks: Task[];
  clients: Client[];
  invoices: Invoice[];
  timeEntries: TimeEntry[];
  deliverables: Deliverable[];

  // Ambient Timer State
  timer: TimerState;
  startTimer: (params: { projectId: string; taskId?: string; clientId: string; description: string; hourlyRate: number }) => void;
  stopTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;
  setTimerDescription: (desc: string) => void;

  // Domain Actions
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  createTask: (task: Omit<Task, 'id' | 'orderIndex'>) => void;
  createProject: (project: Omit<Project, 'id' | 'totalTasks' | 'completedTasks' | 'trackedHours' | 'billedAmount'>) => void;
  createClient: (client: Omit<Client, 'id' | 'activeProjectsCount' | 'totalBilled' | 'outstandingBalance' | 'portalToken'>) => void;
  createInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;
  convertTimeToInvoice: (clientId: string, selectedTimeEntryIds: string[]) => void;
  approveDeliverable: (deliverableId: string, feedback?: string) => void;
  
  // Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

export const useRuneyStore = create<RuneyState>((set, get) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  selectedDate: '2026-09-18',
  setSelectedDate: (date) => set({ selectedDate: date }),

  projects: mockProjects,
  tasks: mockTasks,
  clients: mockClients,
  invoices: mockInvoices,
  timeEntries: mockTimeEntries,
  deliverables: mockDeliverables,

  timer: {
    isRunning: false,
    seconds: 0,
    projectId: 'proj-1',
    taskId: 'task-1',
    clientId: 'cli-1',
    description: 'Working on Liquid Glass components',
    hourlyRate: 150,
  },

  startTimer: ({ projectId, taskId = '', clientId, description, hourlyRate }) => {
    set((state) => ({
      timer: {
        ...state.timer,
        isRunning: true,
        projectId,
        taskId,
        clientId,
        description,
        hourlyRate,
      },
    }));
    get().showToast('Ambient Timer Started');
  },

  stopTimer: () => {
    const { timer, timeEntries, projects, clients } = get();
    if (timer.seconds > 0) {
      const project = projects.find((p) => p.id === timer.projectId);
      const client = clients.find((c) => c.id === timer.clientId);
      
      const newEntry: TimeEntry = {
        id: `time-${Date.now()}`,
        projectId: timer.projectId,
        projectName: project?.title || 'General Task',
        clientId: timer.clientId,
        clientName: client?.company || 'General Client',
        taskId: timer.taskId,
        description: timer.description || 'Logged Working Session',
        startTime: new Date(Date.now() - timer.seconds * 1000).toISOString(),
        endTime: new Date().toISOString(),
        durationSeconds: timer.seconds,
        hourlyRate: timer.hourlyRate || 150,
        isBillable: true,
        isBilled: false,
      };

      set({
        timeEntries: [newEntry, ...timeEntries],
        timer: { ...timer, isRunning: false, seconds: 0 },
      });
      get().showToast(`Logged ${(timer.seconds / 60).toFixed(1)} mins of billable time!`);
    } else {
      set({ timer: { ...timer, isRunning: false } });
    }
  },

  resetTimer: () => {
    set((state) => ({
      timer: { ...state.timer, isRunning: false, seconds: 0 },
    }));
  },

  tickTimer: () => {
    set((state) => {
      if (!state.timer.isRunning) return state;
      return {
        timer: { ...state.timer, seconds: state.timer.seconds + 1 },
      };
    });
  },

  setTimerDescription: (desc) => {
    set((state) => ({
      timer: { ...state.timer, description: desc },
    }));
  },

  moveTask: (taskId, newStatus) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    }));
    get().showToast(`Task moved to ${newStatus.replace('_', ' ').toUpperCase()}`);
  },

  createTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      orderIndex: get().tasks.length,
    };
    set((state) => ({ tasks: [newTask, ...state.tasks] }));
    get().showToast('New task created successfully');
  },

  createProject: (projData) => {
    const newProj: Project = {
      ...projData,
      id: `proj-${Date.now()}`,
      totalTasks: 0,
      completedTasks: 0,
      trackedHours: 0,
      billedAmount: 0,
    };
    set((state) => ({ projects: [newProj, ...state.projects] }));
    get().showToast('New project created');
  },

  createClient: (clientData) => {
    const newClient: Client = {
      ...clientData,
      id: `cli-${Date.now()}`,
      activeProjectsCount: 0,
      totalBilled: 0,
      outstandingBalance: 0,
      portalToken: `portal_${Math.random().toString(36).substring(2, 10)}`,
    };
    set((state) => ({ clients: [newClient, ...state.clients] }));
    get().showToast('New client profile added');
  },

  createInvoice: (invData) => {
    const newInv: Invoice = {
      ...invData,
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${String(get().invoices.length + 43).padStart(4, '0')}`,
    };
    set((state) => ({ invoices: [newInv, ...state.invoices] }));
    get().showToast('Invoice generated & saved');
  },

  convertTimeToInvoice: (clientId, selectedTimeEntryIds) => {
    const { timeEntries, clients } = get();
    const client = clients.find((c) => c.id === clientId);
    if (!client) return;

    const unbilled = timeEntries.filter((t) => selectedTimeEntryIds.includes(t.id));
    if (unbilled.length === 0) return;

    const items = unbilled.map((entry) => ({
      id: `item-${Date.now()}-${entry.id}`,
      description: `${entry.projectName}: ${entry.description}`,
      quantity: +(entry.durationSeconds / 3600).toFixed(2),
      unitPrice: entry.hourlyRate,
      amount: +((entry.durationSeconds / 3600) * entry.hourlyRate).toFixed(2),
      timeEntryId: entry.id,
    }));

    const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
    const taxRate = 7.5;
    const taxAmount = +(subtotal * (taxRate / 100)).toFixed(2);
    const totalAmount = +(subtotal + taxAmount).toFixed(2);

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${String(get().invoices.length + 43).padStart(4, '0')}`,
      clientId: client.id,
      clientName: client.name,
      clientCompany: client.company,
      clientEmail: client.email,
      status: 'draft',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      currency: client.currency,
      items,
      subtotal,
      taxRate,
      taxAmount,
      totalAmount,
      notes: `Auto-generated from ${items.length} unbilled time entries. Net 14 payment terms.`,
      stripePaymentUrl: `https://checkout.stripe.com/pay/cs_live_${Date.now()}`,
    };

    // Mark time entries as billed
    set((state) => ({
      invoices: [newInvoice, ...state.invoices],
      timeEntries: state.timeEntries.map((t) =>
        selectedTimeEntryIds.includes(t.id) ? { ...t, isBilled: true } : t
      ),
      activeTab: 'invoices',
    }));
    get().showToast(`Converted ${items.length} time entries to Invoice ${newInvoice.invoiceNumber}`);
  },

  approveDeliverable: (deliverableId, feedback) => {
    set((state) => ({
      deliverables: state.deliverables.map((d) =>
        d.id === deliverableId
          ? {
              ...d,
              status: 'approved',
              clientFeedback: feedback || 'Deliverable approved via Client Portal.',
            }
          : d
      ),
    }));
    get().showToast('Deliverable status updated to APPROVED');
  },

  toastMessage: null,
  showToast: (msg) => {
    set({ toastMessage: msg });
    setTimeout(() => {
      if (get().toastMessage === msg) {
        set({ toastMessage: null });
      }
    }, 3500);
  },
  clearToast: () => set({ toastMessage: null }),
}));
