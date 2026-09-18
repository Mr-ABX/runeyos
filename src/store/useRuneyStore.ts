import { create } from 'zustand';
import { RuneyTab, TaskViewMode, RuneyTask, RuneyClient, RuneyExpense, RuneyInvoice, OnboardingForm, TaskStatus } from '@/types';
import { mockClientsList, mockProjectTasks, mockExpenses, mockInvoicesList, mockOnboardingForms } from '@/data/mockData';

interface RuneyState {
  currentTab: RuneyTab;
  setCurrentTab: (tab: RuneyTab) => void;
  
  taskViewMode: TaskViewMode;
  setTaskViewMode: (mode: TaskViewMode) => void;

  clients: RuneyClient[];
  selectedClient: RuneyClient;
  setSelectedClient: (client: RuneyClient) => void;

  tasks: RuneyTask[];
  selectedTask: RuneyTask | null;
  setSelectedTask: (task: RuneyTask | null) => void;
  moveTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  toggleChecklistItem: (taskId: string, checklistId: string) => void;
  addTaskTimeLog: (taskId: string, duration: string, cost: number) => void;
  createTask: (task: Partial<RuneyTask>) => void;

  expenses: RuneyExpense[];
  addExpense: (expense: Omit<RuneyExpense, 'id'>) => void;

  invoices: RuneyInvoice[];
  addInvoice: (invoice: Omit<RuneyInvoice, 'id'>) => void;

  onboardingForms: OnboardingForm[];

  // Ambient Floating Timer (Defaults to 00:03:48 matching Runey screenshot!)
  timer: {
    isRunning: boolean;
    seconds: number;
    activeTaskTitle: string;
  };
  startTimer: (taskTitle?: string) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;

  // Global Quick Action / Search Modal
  isQuickSearchOpen: boolean;
  setQuickSearchOpen: (open: boolean) => void;

  // Expandable Sidebar State (Matching Screenshot 6)
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  toggleSidebar: () => void;
}

export const useRuneyStore = create<RuneyState>((set, get) => ({
  currentTab: 'dashboard',
  setCurrentTab: (tab) => set({ currentTab: tab }),

  sidebarExpanded: true,
  setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
  toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),

  taskViewMode: 'board',
  setTaskViewMode: (mode) => set({ taskViewMode: mode }),

  clients: mockClientsList,
  selectedClient: mockClientsList[0],
  setSelectedClient: (client) => set({ selectedClient: client }),

  tasks: mockProjectTasks,
  selectedTask: mockProjectTasks.find((t) => t.id === 'task-106') || null, // Default open "Export to CSV" task inspector matching screenshot!
  setSelectedTask: (task) => set({ selectedTask: task }),

  moveTaskStatus: (taskId, newStatus) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
      selectedTask: state.selectedTask?.id === taskId ? { ...state.selectedTask, status: newStatus } : state.selectedTask,
    }));
  },

  toggleChecklistItem: (taskId, checklistId) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id !== taskId) return task;
        return {
          ...task,
          checklist: task.checklist.map((item) =>
            item.id === checklistId ? { ...item, completed: !item.completed } : item
          ),
        };
      }),
      selectedTask:
        state.selectedTask?.id === taskId
          ? {
              ...state.selectedTask,
              checklist: state.selectedTask.checklist.map((item) =>
                item.id === checklistId ? { ...item, completed: !item.completed } : item
              ),
            }
          : state.selectedTask,
    }));
  },

  addTaskTimeLog: (taskId, duration, cost) => {
    const newLog = {
      id: `tt-${Date.now()}`,
      user: { name: 'Julian Reed', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      duration,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cost,
    };

    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, timeTracked: [newLog, ...t.timeTracked] } : t)),
      selectedTask:
        state.selectedTask?.id === taskId
          ? { ...state.selectedTask, timeTracked: [newLog, ...state.selectedTask.timeTracked] }
          : state.selectedTask,
    }));
  },

  createTask: (taskData) => {
    const newTask: RuneyTask = {
      id: `task-${Date.now()}`,
      projectId: 'proj-analytics',
      projectName: 'Dashboard Analytics',
      title: taskData.title || 'Untitled Task',
      description: taskData.description || '',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      cost: taskData.cost || 0,
      checklist: taskData.checklist || [],
      timeTracked: [],
      additionalCosts: [],
      ...taskData,
    };
    set((state) => ({ tasks: [newTask, ...state.tasks] }));
  },

  expenses: mockExpenses,
  addExpense: (expenseData) => {
    const newExp: RuneyExpense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
    };
    set((state) => ({ expenses: [newExp, ...state.expenses] }));
  },

  invoices: mockInvoicesList,
  addInvoice: (invData) => {
    const newInv: RuneyInvoice = {
      ...invData,
      id: `inv-${Date.now()}`,
    };
    set((state) => ({ invoices: [newInv, ...state.invoices] }));
  },

  onboardingForms: mockOnboardingForms,

  timer: {
    isRunning: true,
    seconds: 228, // 00:03:48 matching Runey screenshot!
    activeTaskTitle: 'Export to CSV',
  },

  startTimer: (taskTitle) => {
    set((state) => ({
      timer: {
        ...state.timer,
        isRunning: true,
        activeTaskTitle: taskTitle || state.timer.activeTaskTitle || 'Working Session',
      },
    }));
  },

  pauseTimer: () => {
    set((state) => ({
      timer: { ...state.timer, isRunning: false },
    }));
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

  isQuickSearchOpen: false,
  setQuickSearchOpen: (open) => set({ isQuickSearchOpen: open }),
}));
