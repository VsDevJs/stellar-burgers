import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TFeedsResponse } from "@utils-types";
import { getFeeds } from "./actions";

// Что это !?;
// import { act } from "react-dom/test-utils";

// Храним null или false ?;
const initialState:TFeedsResponse = { 
  orders:[],
  total:0,
  success:false,
  totalToday:0,
}

export const feedSlice = createSlice({
  name:'feed',
  initialState,

  reducers: {},

  selectors: {
    getOrders: (state) => state.orders,
    getOrder: (state) => { state }, // напишем щас поиск по number , потом вынесем ниже в селектор и используем в thunk;
    // Также сделаем общий selector для всех слайсов, там state общий короче;
    getFeedState: (state) => state,
  },
  extraReducers: (builder) => {
    builder
    .addCase(getFeeds.pending, (state) => {
        state.success = false;
    })
    .addCase(getFeeds.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
  }
})


export const { getOrders, getFeedState } = feedSlice.selectors;

