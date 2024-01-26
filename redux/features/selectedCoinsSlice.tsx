'use client';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/redux/store";
import { CoinData } from "@/types";
import formatTime from "@/utils/formatTime";

interface GetCoinDataArgs {
  currency: string;
  timeStamp: string;
  coinId: string;
}

export interface selectedCoinState {
  selectedCoins: CoinData[];
  timeStamp: string;
  loading: string;
  hasError: boolean;
}

const initialState: selectedCoinState = {
  selectedCoins: [],
  timeStamp: "1",
  loading: "idle",
  hasError: false
}

export const getCoinData = createAsyncThunk('coinData/getCoinData',
  async ({ currency, timeStamp, coinId }: GetCoinDataArgs, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${timeStamp}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
      const { prices, total_volumes } = data;

      const timeFormattedPrices = prices.map((item: string) => [formatTime(item[0], timeStamp), item[1]]);
      const timeFormattedVolumes = total_volumes.map((item: string) => [formatTime(item[0], timeStamp), item[1]]);

      const item: CoinData = {
        id: coinId,
        prices: timeFormattedPrices,
        total_volumes: timeFormattedVolumes
      }
      return item;
    } catch (error) {
      return rejectWithValue(error);
    }
  });

export const getAllCoinsData = createAsyncThunk('coinData/getAllCoinsData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState() as RootState;
      const currency: string = state.currency.currency;
      const timeStamp: string = state.selectedCoins.timeStamp;

      const coinDataPromises = state.selectedCoins.selectedCoins.map(async (coin: CoinData) => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${timeStamp}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
        const { prices, total_volumes } = data;

        const timeFormattedPrices = prices.map((item: string) => [formatTime(item[0], timeStamp), item[1]]);
        const timeFormattedVolumes = total_volumes.map((item: string) => [formatTime(item[0], timeStamp), item[1]]);

        return {
          id: coin.id,
          prices: timeFormattedPrices,
          total_volumes: timeFormattedVolumes
        };
      });

      return await Promise.all(coinDataPromises);
    } catch (error) {
      return rejectWithValue(error);
    }
  });

const selectedCoinsSlice = createSlice({
  name: "selectedCoin",
  initialState,
  reducers: {
    removeCoin(state, action) {
      const coinIdToRemove = action.payload;
      const newList = state.selectedCoins.filter((item) => item.id !== coinIdToRemove);
      state.selectedCoins = newList;
    },
    updateTimeStamp: (state, action) => {
      state.timeStamp = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoinData.pending, (state) => {
        state.loading = "pending";
        state.hasError = false;
      })
      .addCase(getCoinData.fulfilled, (state, action) => {
        state.selectedCoins = [...state.selectedCoins, action.payload];
        state.loading = "fulfilled";
      })
      .addCase(getCoinData.rejected, (state, action) => {
        state.loading = "rejected";
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      })
      .addCase(getAllCoinsData.pending, (state) => {
        state.loading = "pending";
        state.hasError = false;
      })
      .addCase(getAllCoinsData.fulfilled, (state, action) => {
        state.selectedCoins = action.payload;
        state.loading = "fulfilled";
      })
      .addCase(getAllCoinsData.rejected, (state, action) => {
        state.loading = "rejected";
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  }
});

export const { removeCoin, updateTimeStamp } = selectedCoinsSlice.actions;
export default selectedCoinsSlice.reducer;