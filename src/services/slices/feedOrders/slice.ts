import { createSlice } from "@reduxjs/toolkit";

import { TFeedsResponse } from "@utils-types";
import { getFeeds, getFeedOrder } from "./actions";

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
    .addCase(getFeedOrder.fulfilled, () => { 
        
    })
  }
})

export const { getOrders, getFeedState } = feedSlice.selectors;