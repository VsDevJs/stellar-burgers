import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderBurgerApi } from '@api';
import { TNewOrderResponse } from '@utils-types';

export const createOrder = createAsyncThunk<TNewOrderResponse, string[]>('order/Create', 
  async (data:string[], { signal }) => {
    return orderBurgerApi(data, signal);
  })