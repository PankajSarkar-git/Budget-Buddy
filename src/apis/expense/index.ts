import {PageParams} from '../../utils/types';
import api from '../api';
import expenseApiEndpoint from './config';

const expenseApi = {
  async postAddExpense(payload: any) {
    const res = await api.post(expenseApiEndpoint.expense, payload);
    return res;
  },
  async putEditExpense(id: string, payload: any) {
    const res = await api.put(`${expenseApiEndpoint.expense}/${id}`, payload);
    return res;
  },
  async deleteExpense(id: string) {
    const res = await api.delete(`${expenseApiEndpoint.expense}/${id}`);
    return res;
  },
  async getAllExpense(params: PageParams) {
    const res = await api.get(
      `${expenseApiEndpoint.expense}?page=${params.page}&limit=${params.limit}`,
    );
    return res;
  },
  async getExpenseStats(params: PageParams) {
    const res = await api.get(
      `${expenseApiEndpoint.expenseStats}?filter=${params.filter}&page=${params.page}&limit=${params.limit}`,
    );
    return res;
  },
};

export default expenseApi;
