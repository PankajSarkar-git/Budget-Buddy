import {EditPayloadType, PageParams} from '../../utils/types';
import api from '../api';
import earningApiEndpoint from './config';

const earningApi = {
  async postAddEarning(payload: any) {
    const res = await api.post(earningApiEndpoint.earning, payload);
    return res;
  },
  async putEditEarning(payload: EditPayloadType) {
    const res = await api.put(
      `${earningApiEndpoint.earning}/${payload.id}`,
      payload.data,
    );
    return res;
  },
  async deleteEarning(id: string) {
    const res = await api.delete(`${earningApiEndpoint.earning}/${id}`);
    return res;
  },
  async getAllEarning(params: PageParams) {
    const res = await api.get(
      `${earningApiEndpoint.earning}?page=${params.page}&limit=${params.limit}&source=${params.filter}&filter=${params.filterTime}`,
    );
    return res;
  },
  async getEarningStats(params: PageParams) {
    const res = await api.get(
      `${earningApiEndpoint.earningStats}?filter=${params.filter}&page=${params.page}&limit=${params.limit}`,
    );
    return res;
  },
};

export default earningApi;
