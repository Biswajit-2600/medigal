export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  walletBalance: number;
}

export interface Consultation {
  id: string;
  userId: string;
  doctorName: string;
  date: string;
  duration: number;
  cost: number;
  status: 'completed' | 'cancelled' | 'scheduled';
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: string;
}

// Mock data
export const mockConsultations: Consultation[] = [
  {
    id: '1',
    userId: '1',
    doctorName: 'Dr. John Smith',
    date: '2025-09-20T10:00:00Z',
    duration: 30,
    cost: 100,
    status: 'completed',
  },
  {
    id: '2',
    userId: '1',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-09-18T15:30:00Z',
    duration: 45,
    cost: 150,
    status: 'completed',
  },
  {
    id: '3',
    userId: '1',
    doctorName: 'Dr. Michael Brown',
    date: '2025-09-22T14:00:00Z',
    duration: 30,
    cost: 100,
    status: 'scheduled',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    amount: 500,
    type: 'credit',
    description: 'Wallet recharge',
    date: '2025-09-19T08:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    amount: 100,
    type: 'debit',
    description: 'Consultation with Dr. John Smith',
    date: '2025-09-20T10:30:00Z',
  },
  {
    id: '3',
    userId: '1',
    amount: 150,
    type: 'debit',
    description: 'Consultation with Dr. Sarah Johnson',
    date: '2025-09-18T16:15:00Z',
  },
  {
    id: '4',
    userId: '1',
    amount: 1000,
    type: 'credit',
    description: 'Wallet recharge',
    date: '2025-09-17T14:20:00Z',
  },
];