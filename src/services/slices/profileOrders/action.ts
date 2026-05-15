import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrdersApi } from '@api';


export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetchProfileOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);