import {EditPayloadType, PageParams} from '../../utils/types';
import api from '../api';
import expenseApiEndpoint from './config';

const expenseApi = {
  async postAddExpense(payload: any) {
    const res = await api.post(expenseApiEndpoint.expense, payload);
    return res;
  },
  async putEditExpense(payload: EditPayloadType) {
    const res = await api.put(
      `${expenseApiEndpoint.expense}/${payload.id}`,
      payload.data,
    );
    return res;
  },
  async deleteExpense(id: string) {
    const res = await api.delete(`${expenseApiEndpoint.expense}/${id}`);
    return res;
  },
  async getAllExpense(params: PageParams) {
    const res = await api.get(
      `${expenseApiEndpoint.expense}?page=${params.page}&limit=${params.limit}&category=${params.filter}&filter=${params.filterTime}`,
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
