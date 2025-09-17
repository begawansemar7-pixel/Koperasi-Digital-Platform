// Fix: Removed a self-import statement from this file which was causing declaration conflicts.
export interface User {
  id: string;
  name: string;
  memberId: string;
  joinDate: string;
  avatarUrl: string;
  address: string;
  phone: string;
  email: string;
  bankAccount: string;
}

export interface Product {
  id: string;
  name:string;
  seller: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  category: string;
  description?: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

export interface Savings {
  principal: number; // Simpanan Pokok
  mandatory: number; // Simpanan Wajib
  voluntary: number; // Simpanan Sukarela
}

export interface RepaymentInstallment {
  dueDate: string;
  principal: number;
  interest: number;
  total: number;
  status: 'Paid' | 'Upcoming';
}

export interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  startDate: string;
  status: 'Approved' | 'Pending' | 'Paid Off' | 'Rejected';
  remainingBalance: number;
  repaymentSchedule?: RepaymentInstallment[];
}

export interface Comment {
    id: string;
    productId: string;
    authorName: string;
    authorAvatar: string;
    text: string;
    date: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  imageUrl: string;
  cta: {
    text: string;
    link: string;
  };
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  imageUrl: string;
}

export interface LoyaltyTransaction {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earned' | 'redeemed';
}