export type TaskStatus = 'backlog' | 'in_progress' | 'in_review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  orderIndex: number;
  dueDate?: string;
  estimatedMinutes?: number;
  trackedMinutes?: number;
  tags?: string[];
  assignedTo?: {
    name: string;
    avatar: string;
  };
}

export interface Project {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  description: string;
  status: 'planning' | 'active' | 'in_review' | 'completed' | 'archived';
  budget: number;
  hourlyRate: number;
  deadline: string;
  accentColor: string;
  totalTasks: number;
  completedTasks: number;
  trackedHours: number;
  billedAmount: number;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  avatar?: string;
  billingAddress: string;
  defaultHourlyRate: number;
  currency: string;
  activeProjectsCount: number;
  totalBilled: number;
  outstandingBalance: number;
  portalToken: string;
  notes?: string;
}

export interface TimeEntry {
  id: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  taskId?: string;
  taskTitle?: string;
  description: string;
  startTime: string;
  endTime?: string;
  durationSeconds: number;
  hourlyRate: number;
  isBillable: boolean;
  isBilled: boolean;
}

export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  timeEntryId?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  currency: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  notes?: string;
  stripePaymentUrl?: string;
  paidAt?: string;
}

export interface Deliverable {
  id: string;
  projectId: string;
  title: string;
  description: string;
  fileUrl?: string;
  fileType: 'figma' | 'pdf' | 'image' | 'code' | 'archive';
  fileSize?: string;
  status: 'pending_approval' | 'approved' | 'changes_requested';
  submittedAt: string;
  clientFeedback?: string;
}

export interface AISettings {
  provider: 'openai' | 'anthropic' | 'gemini' | 'groq';
  apiKey: string;
  isEnabled: boolean;
  customEndpoint?: string;
}
