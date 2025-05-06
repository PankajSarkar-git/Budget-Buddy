import {createAsyncThunk} from '@reduxjs/toolkit';
import {PageParams} from '../../utils/types';
import earningApiEndpoint from '../../apis/earning/config';
import earningApi from '../../apis/earning';

export const addEarning = createAsyncThunk(
  `${earningApiEndpoint.earning}Post`,
  async (payload: any, {rejectWithValue}) => {
    try {
      const {status, data} = await earningApi.postAddEarning(payload);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);

export const editEarning = createAsyncThunk(
  `${earningApiEndpoint.earning}Put`,
  async (payload: any, {rejectWithValue}) => {
    try {
      const {status, data} = await earningApi.putEditEarning(payload);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);
export const deleteEarning = createAsyncThunk(
  `${earningApiEndpoint.earning}Delete`,
  async (id: string, {rejectWithValue}) => {
    try {
      const {status, data} = await earningApi.deleteEarning(id);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);
export const allEarning = createAsyncThunk(
  `${earningApiEndpoint.earning}Get`,
  async (params: PageParams, {rejectWithValue}) => {
    try {
      const {status, data} = await earningApi.getAllEarning(params);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);
export const earningStats = createAsyncThunk(
  `${earningApiEndpoint.earningStats}Get`,
  async (params: PageParams, {rejectWithValue}) => {
    try {
      const {status, data} = await earningApi.getEarningStats(params);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);
