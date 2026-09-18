export type RuneyTab = 
  | 'dashboard'
  | 'clients'
  | 'projects'
  | 'tasks'
  | 'invoices'
  | 'expenses'
  | 'onboarding'
  | 'integrations'
  | 'analytics'
  | 'ai'
  | 'settings';

export type TaskViewMode = 'board' | 'list' | 'table';

export type TaskStatus = 'request' | 'todo' | 'in_progress' | 'review';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TimeTrackedEntry {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  duration: string;
  date: string;
  cost: number;
}

export interface AdditionalCost {
  id: string;
  title?: string;
  amount: number;
}

export interface RuneyTask {
  id: string;
  projectId: string;
  projectName?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  cost?: number;
  startDate?: string;
  dueDate?: string;
  coverImage?: string;
  assignee?: {
    name: string;
    avatar: string;
  };
  timeTracked: TimeTrackedEntry[];
  additionalCosts: AdditionalCost[];
  checklist: ChecklistItem[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  dayNumber: number;
  month: string;
  amount?: number;
  type: 'invoice_sent' | 'customer_added' | 'maintenance' | 'project_started' | 'invoice_paid';
  color: 'blue' | 'black' | 'red' | 'dark' | 'green';
}

export interface RuneyClient {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  avatar: string;
  status: 'active' | 'inactive';
  totalBilled: number;
  collected: number;
  outstanding: number;
  projectsCount: number;
  documentsCount: number;
  timelineEvents: TimelineEvent[];
}

export interface RuneyExpense {
  id: string;
  title: string;
  vendor: string;
  paymentMethod: string;
  category: string;
  date: string;
  dayLabel: string;
  amount: number;
  vendorLogo: string;
}

export interface RuneyInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientCompany: string;
  amount: number;
  status: 'paid' | 'open' | 'overdue' | 'draft';
  issueDate: string;
  dueDate: string;
  currency: string;
  projectTitle?: string;
}

export interface OnboardingForm {
  id: string;
  clientName: string;
  projectType: string;
  status: 'active' | 'completed';
  shareableLink: string;
  steps: {
    title: string;
    description: string;
    completed: boolean;
  }[];
  uploadedAssetsCount: number;
  hasSignedAgreement: boolean;
}
