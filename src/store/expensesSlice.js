// src/redux/expensesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async (_, { getState }) => {
  const state = getState();
  const response = await fetch('https://expense-tracker-latest-de30f-default-rtdb.firebaseio.com/addexpense.json', {
    headers: {
      Authorization: `Bearer ${state.auth.token}`,
    },
  });

  const data = await response.json(); 
   console.log(data)
  return Object.keys(data).map((id) => ({
    id,
    ...data[id],
  }));
});

export const saveExpense = createAsyncThunk('expenses/saveExpense', async (expense, { getState }) => {
  const state = getState();
  const response = await fetch('https://expense-tracker-latest-de30f-default-rtdb.firebaseio.com/addexpense.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.auth.token}`,
    },
    body: JSON.stringify(expense),
  });
  return response.json();
});

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
    isLoading: false,
  },
  reducers: {
    deleteExpense: (state, action) => {
      state.items = state.items.filter((expense) => expense.id !== action.payload);
    },
    updateExpense: (state, action) => {
      const index = state.items.findIndex((expense) => expense.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchExpenses.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(saveExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { deleteExpense, updateExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
