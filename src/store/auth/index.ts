import {createSlice} from '@reduxjs/toolkit';
import {getUserDetails, login, signUp} from './action';
import {AuthState} from '../../utils/types';

const initialState: AuthState = {
  email: '',
  id: '',
  token: '',
  verified: null,
  userType: '',
  userData: null,
  currentEarning: 0,
  currentExpense: 0,
  currentSavings: 0,
  currentBalance: 0,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitialState: (state: AuthState) => {
      return initialState;
    },
    updateEarning: (state: AuthState, {payload}) => {
      //console.log('payload----updateEarning', payload);
      state.currentEarning = state.currentEarning + payload;
      state.currentBalance = state.currentBalance + payload;
    },
    updateExpense: (state: AuthState, {payload}) => {
      //console.log('payload----updateExpense', payload);
      state.currentExpense = state.currentExpense + payload;
      state.currentBalance = state.currentBalance - payload;
    },
    afterEditExpencesUpdate: (state: AuthState, {payload}) => {
      //console.log('payload----updateExpense', payload);
      state.currentExpense = state.currentExpense - payload;
      state.currentBalance = state.currentBalance - payload;
    },
    afterDeletEarningUpadate: (state: AuthState, {payload}) => {
      //console.log('payload----updateExpense', payload);
      state.currentEarning = state.currentEarning - payload;
      state.currentBalance = state.currentBalance - payload;
    },
    afterDeletExpenseUpadate: (state: AuthState, {payload}) => {
      //console.log('payload----updateExpense', payload);
      state.currentExpense = state.currentExpense - payload;
      state.currentBalance = state.currentBalance - payload;
    },
    logout: (state: AuthState) => {
      return initialState;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      login.fulfilled,
      (state: AuthState, {payload}: {payload: any}) => {
        const {status, data} = payload;

        if (status === 200 && data.success) {
          return {
            ...state,
            token: data?.token,
            verified: data?.verified,
            userType: data?.user?.role,
            userData: data?.user || null,
            currentEarning: data?.user?.currentEarning,
            currentExpense: data?.user?.currentExpense,
            currentSavings: data?.user?.currentSavings,
            currentBalance: data?.user?.currentBalance,
          };
        } else {
          return initialState;
        }
      },
    );
    builder.addCase(
      signUp.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data} = payload;
        //console.log('Data', data);

        if (status === 201 && data.success) {
          return {
            ...state,
            token: data?.token,
            verified: data?.verified,
            userType: data?.user?.role,
            userData: data?.user || null,
            currentEarning: data?.user?.currentEarning,
            currentExpense: data?.user?.currentExpense,
            currentSavings: data?.user?.currentSavings,
            currentBalance: data?.user?.currentBalance,
          };
        } else {
          return initialState;
        }
      },
    );
    builder.addCase(
      getUserDetails.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data} = payload;

        if (status === 200 && data.success) {
          return {
            ...state,
            // token: data?.token,
            verified: data?.verified,
            userType: data?.user?.role,
            userData: data?.user || null,
            currentEarning: data?.user?.currentEarning,
            currentExpense: data?.user?.currentExpense,
            currentSavings: data?.user?.currentSavings,
            currentBalance: data?.user?.currentBalance,
          };
        } else {
          return initialState;
        }
      },
    );
  },
});

export const {
  setInitialState,
  updateEarning,
  updateExpense,
  afterDeletExpenseUpadate,
  afterDeletEarningUpadate,
  afterEditExpencesUpdate,
  logout,
} = AuthSlice.actions;

export {login, signUp, getUserDetails};
export default AuthSlice.reducer;
