import {createAsyncThunk} from '@reduxjs/toolkit';
import {PageParams} from '../../utils/types';
import earningApiEndpoint from '../../apis/earning/config';
import earningApi from '../../apis/earning';

export const addEarning = createAsyncThunk(
  `${earningApiEndpoint.earning}Post`,
  async (payload: any) => {
    const {status, data} = await earningApi.postAddEarning(payload);
    return {status, data};
  },
);

export const editEarning = createAsyncThunk(
  `${earningApiEndpoint.earning}Put`,
  async (payload: any) => {
    const {status, data} = await earningApi.putEditEarning(payload);
    return {status, data};
  },
);
export const deleteEarning = createAsyncThunk(
  `${earningApiEndpoint.earning}Delete`,
  async (id: string) => {
    const {status, data} = await earningApi.deleteEarning(id);
    return {status, data};
  },
);
export const allEarning = createAsyncThunk(
  `${earningApiEndpoint.earning}Get`,
  async (params: PageParams) => {
    const {status, data} = await earningApi.getAllEarning(params);
    return {status, data};
  },
);
export const earningStats = createAsyncThunk(
  `${earningApiEndpoint.earningStats}Get`,
  async (params: PageParams) => {
    const {status, data} = await earningApi.getEarningStats(params);
    return {status, data};
  },
);
