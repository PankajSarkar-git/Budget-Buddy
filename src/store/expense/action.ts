import {createAsyncThunk} from '@reduxjs/toolkit';
import expenseApiEndpoint from '../../apis/expense/config';
import expenseApi from '../../apis/expense';
import {PageParams} from '../../utils/types';

export const addExpense = createAsyncThunk(
  `${expenseApiEndpoint.expense}Post`,
  async (payload: any, {rejectWithValue}) => {
    try {
      const {status, data} = await expenseApi.postAddExpense(payload);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);

export const editExpense = createAsyncThunk(
  `${expenseApiEndpoint.expense}Put`,
  async (payload: any, {rejectWithValue}) => {
    try {
      const {status, data} = await expenseApi.putEditExpense(payload);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);
export const deleteExpense = createAsyncThunk(
  `${expenseApiEndpoint.expense}Delete`,
  async (id: string, {rejectWithValue}) => {
    try {
      const {status, data} = await expenseApi.deleteExpense(id);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);
export const allExpense = createAsyncThunk(
  `${expenseApiEndpoint.expense}Get`,
  async (params: PageParams, {rejectWithValue}) => {
    try {
      const {status, data} = await expenseApi.getAllExpense(params);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);
export const expenseStats = createAsyncThunk(
  `${expenseApiEndpoint.expenseStats}Get`,
  async (params: PageParams, {rejectWithValue}) => {
    try {
      const {status, data} = await expenseApi.getExpenseStats(params);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);
