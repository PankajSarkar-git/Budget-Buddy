import {createSlice} from '@reduxjs/toolkit';
import {
  addEarning,
  allEarning,
  deleteEarning,
  earningStats,
  editEarning,
} from './action';
import {AllEarning, ApiResponse} from '../../utils/types';

const initialState = {};

export const ExpenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setInitialState: (state: any) => {
      return initialState;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      addEarning.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data} = payload;

        if (status === 200 && data.success) {
          return {
            ...state,
            // token: data?.token,
            // verified: data?.verified,
            // userType: data?.user?.role,
            // userData: data?.user || null,
            // currentEarning: data?.user?.currentEarning,
            // currentExpense: data?.user?.currentExpense,
            // currentSavings: data?.user?.currentSavings,
            // currentBalance: data?.user?.currentBalance,
          };
        } else {
          return initialState;
        }
      },
    );
    builder.addCase(
      allEarning.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data} = payload;
        // console.log('Data', data);

        if (status === 200 && data.success) {
          return {
            ...state,
          };
        } else {
          return initialState;
        }
      },
    );
    builder.addCase(
      deleteEarning.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data} = payload;
        // console.log('Data', data);

        if (status === 200 && data.success) {
          return {
            ...state,
          };
        } else {
          return initialState;
        }
      },
    );
    builder.addCase(
      editEarning.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data} = payload;
        // console.log('Data', data);

        if (status === 200 && data.success) {
          return {
            ...state,
          };
        } else {
          return initialState;
        }
      },
    );
    builder.addCase(
      earningStats.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data}: ApiResponse<AllEarning, 'eraning'> = payload;
        // console.log('Data', data);

        if (status === 200 && data.success) {
          return {
            ...state,
          };
        } else {
          return initialState;
        }
      },
    );
  },
});

export const {setInitialState} = ExpenseSlice.actions;

export {addEarning, allEarning, editEarning, earningStats, deleteEarning};
export default ExpenseSlice.reducer;
