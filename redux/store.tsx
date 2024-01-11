'use client';

import { useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/redux/features/globalSlice";
import currencyReducer from "@/redux/features/currencySlice";
import coinMarketReducer from "@/redux/features/coinMarketSlice";
import selectedCoinReducer from "@/redux/features/selectedCoinsSlice";
import portfolioReducer from "@/redux/features/potfolioSlice";

export const  store = configureStore({
  reducer: {
    currency: currencyReducer,
    globalData: globalReducer,
    coins: coinMarketReducer,
    selectedCoins: selectedCoinReducer,
    portfolio: portfolioReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;