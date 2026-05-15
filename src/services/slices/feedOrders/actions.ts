import { createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TStatusFeed, TTabFeed } from './type';
import { RootState } from '../../store';
import { selectOrderByNumber } from '@selectors';


// Используем внешний селектор - selectOrderByNumber 
// Если ингридеент присутствует в хранилище, то отдаём, если нет - запрос на сервер на прямую 

export const getFeedOrder = createAsyncThunk('feeds/fetchOne',
  async (number: number, { getState }) => {

    const state = getState() as RootState;

    // Получаем ордер из хранилиза или undefined
    const { feedOrder, feedIngridients } = selectOrderByNumber(state, number);

    if (feedOrder)
      return { feedOrder, feedIngridients }

    // Если переход будет напрямую и в store нет данной позиции, загружаем с сервера напрямую
    else {
      const response = await getOrderByNumberApi(number);
      const feedOrder = response.orders[0];
      const { feedIngridients } = selectOrderByNumber(state, feedOrder);
      return { feedOrder, feedIngridients };
    }
  })

export const getFeeds = createAsyncThunk('feeds/fetchAll',
  async () => {
    return await getFeedsApi();
  });

export const getStatusIngredients = createSelector(
  (state: RootState) => state.feed.orders,
  (orders): TStatusFeed => {
    return orders.reduce((ac, el) => {

      const status = el.status as TTabFeed;

      ac[status].push(el.number);

      return ac;

    }, { pending: [], done: [] } as Record<TTabFeed, number[]>);
  })