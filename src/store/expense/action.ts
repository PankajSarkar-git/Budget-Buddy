import {createAsyncThunk} from '@reduxjs/toolkit';
import expenseApiEndpoint from '../../apis/expense/config';
import expenseApi from '../../apis/expense';
import {PageParams} from '../../utils/types';

export const addExpense = createAsyncThunk(
  `${expenseApiEndpoint.expense}Post`,
  async (payload: any) => {
    const {status, data} = await expenseApi.postAddExpense(payload);
    return {status, data};
  },
);

export const editExpense = createAsyncThunk(
  `${expenseApiEndpoint.expense}Put`,
  async (id: string, payload: any) => {
    const {status, data} = await expenseApi.putEditExpense(id, payload);
    return {status, data};
  },
);
export const deleteExpense = createAsyncThunk(
  `${expenseApiEndpoint.expense}Delete`,
  async (id: string) => {
    const {status, data} = await expenseApi.deleteExpense(id);
    return {status, data};
  },
);
export const allExpenseExpense = createAsyncThunk(
  `${expenseApiEndpoint.expense}Get`,
  async (params: PageParams) => {
    const {status, data} = await expenseApi.getAllExpense(params);
    return {status, data};
  },
);
export const expenseStats = createAsyncThunk(
  `${expenseApiEndpoint.expenseStats}Get`,
  async (params: PageParams) => {
    const {status, data} = await expenseApi.getExpenseStats(params);
    return {status, data};
  },
);
