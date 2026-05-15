import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { burgerIngredients, userSlice, burgerConstructor, feedSlice, profileOrdersSlice } from '@slices';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineSlices(burgerIngredients, userSlice, burgerConstructor, feedSlice, profileOrdersSlice);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
