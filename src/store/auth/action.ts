import {createAsyncThunk} from '@reduxjs/toolkit';
import authApiEndpoint from '../../apis/auth/config';
import authApi from '../../apis/auth';
import userApiEndpoint from '../../apis/user/config';
import userApi from '../../apis/user';

export const login = createAsyncThunk(
  `${authApiEndpoint.login}Post`,
  async (payload: any, {rejectWithValue}) => {
    try {
      const {status, data} = await authApi.postLogin(payload);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);

export const signUp = createAsyncThunk(
  `${authApiEndpoint.register}Post`,
  async (payload: any, {rejectWithValue}) => {
    try {
      const {status, data} = await authApi.postSignUp(payload);
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);

export const getUserDetails = createAsyncThunk(
  `${userApiEndpoint.userDetails}Get`,
  async (_, {rejectWithValue}) => {
    try {
      const {status, data} = await userApi.getUserDetails();
      return {status, data};
    } catch (error: any) {
      const res: any = rejectWithValue(error.response);
      return res;
    }
  },
);
