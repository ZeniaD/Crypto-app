"use client";

import { createSlice } from "@reduxjs/toolkit";
import { Portfolio } from "@/types";

interface PortfolioState {
  portfolio: Portfolio[];
}

const initialState: PortfolioState = {
  portfolio: [],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addPortfolio(state, action) {
      state.portfolio = [...state.portfolio, action.payload];
    },
  },
});

export const { addPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;