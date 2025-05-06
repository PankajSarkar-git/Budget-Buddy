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
  filterTime?: string;
}
export type DropdownItem = {
  label: string;
  value: string;
};
export interface EarningItemSource {
  totalEarning: string;
  source: string;
}
export interface EarningItemCategory {
  category: string;
  totalExpense: string;
}

interface EarningANdExpenseDetails {
  id: string;
  amount: number;
  description: string;
  date: Date;
  createdAt: string;
  updatedAt: string;
}
export interface AllEarning extends EarningANdExpenseDetails {
  source?: string;
}

export interface AllExpense extends EarningANdExpenseDetails {
  category?: string;
}

export interface ApiResponse<T, K extends string> {
  // useCase ApiResponse<User, 'user'>
  status: number;
  data: {
    msg: string;
    success: boolean;
  } & {
    [P in K]: T;
  };
}

export interface EditPayloadType {
  id: string;
  data: any;
}
