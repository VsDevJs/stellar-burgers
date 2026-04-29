import { createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getIngredientsApi } from '@api'
import { RootState } from '../../store';
import { TTabMode, TIngredient } from "@utils-types";

export const checkIngridients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => 
    getIngredientsApi()
);

export const getCategoryIngredients = createSelector(
  (state: RootState) => state.burgerIngredients.ingredients,
  (ingredients) => {
      return ingredients.reduce((ac, el) => {
        const type = el.type as TTabMode;
                  
                  if (!ac[type]) 
                      ac[type] = [];
                    ac[type].push(el);
                    return ac;
                    
                }, {} as Record<TTabMode, TIngredient[]>);
    });