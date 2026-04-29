import { createSlice } from "@reduxjs/toolkit";
import { TOrdersData } from '@utils-types';
import { fetchProfileOrders } from './action';

// Пишем слайс, которые принимает заказы; 


const initialState:TOrdersData & { isLoading:boolean, error:string }= {
  orders:[],
  total:0,
  totalToday:0,
  isLoading:false,
  error:'',
}

// Получение ордеров по кукам;

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors:{
    getProfileOrders: (state) => state.orders,
    isLoadingProfileOrders:(state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.error = '';
        state.isLoading = false;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        if(action.error.message)
          state.error = action.error.message;
      });
  }
});

export const { getProfileOrders, isLoadingProfileOrders } = profileOrdersSlice.selectors;

