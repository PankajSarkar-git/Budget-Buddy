import {createAsyncThunk} from '@reduxjs/toolkit';
import authApiEndpoint from '../../apis/auth/config';
import authApi from '../../apis/auth';

export const login = createAsyncThunk(
  `${authApiEndpoint.login}Post`,
  async (payload: any) => {
    const {status, data} = await authApi.postLogin(payload);
    return {status, data};
  },
);

export const signUp = createAsyncThunk(
  `${authApiEndpoint.register}Post`,
  async (payload: any) => {
    const {status, data} = await authApi.postSignUp(payload);
    return {status, data};
  },
);
