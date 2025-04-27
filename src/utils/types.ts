export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  currentEarning: number;
  currentExpense: number;
  currentSavings: number;
  currentBalance: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface AuthState {
  email: string;
  id: string;
  token: string;
  userType: string;
  verified?: null | string;
  userData: User | null;
  currentEarning: number;
  currentExpense: number;
  currentSavings: number;
  currentBalance: number;
}

export interface PageParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  filter?: string;
}
