// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expensesReducer from './expensesSlice';
import totalAmountSlice from './totalAmountSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    totalAmount: totalAmountSlice,
  },
});

export default store;
