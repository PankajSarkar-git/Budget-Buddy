import {createSlice} from '@reduxjs/toolkit';
import {
  addExpense,
  allExpenseExpense,
  deleteExpense,
  editExpense,
  expenseStats,
} from './action';

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
      addExpense.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data} = payload;

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
      allExpenseExpense.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data} = payload;
        console.log('Data', data);

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
      deleteExpense.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data} = payload;
        console.log('Data', data);

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
      editExpense.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data} = payload;
        console.log('Data', data);

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
      expenseStats.fulfilled,
      (state: any, {payload}: {payload: any}) => {
        const {status, data} = payload;
        console.log('Data', data);

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

export {
  addExpense,
  allExpenseExpense,
  editExpense,
  expenseStats,
  deleteExpense,
};
export default ExpenseSlice.reducer;
