import { createSlice } from '@reduxjs/toolkit';

const totalAmountSlice = createSlice({
  name: 'totalAmount',
  initialState: {
    totalAmount: 0,
    isPremium: true,
    isDarkTheme:false
  },
  reducers: {
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    premiumClicked: (state) => {
      state.isPremium = true;
    },
    notPremiumClicked: (state) => {
      state.isPremium = false;
    },
    notDarkClicked: (state) => {
      state.isDarkTheme = false;
    },
    darkClicked: (state) => {
      state.isDarkTheme = true;
    }
  },
});

export const { setTotalAmount, premiumClicked, notPremiumClicked,notDarkClicked,darkClicked } = totalAmountSlice.actions;

export default totalAmountSlice.reducer;
