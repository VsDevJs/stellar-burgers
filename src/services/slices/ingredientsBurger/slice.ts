import { createSlice } from "@reduxjs/toolkit";
import { TIngredientsState, } from './type'
import { checkIngridients } from './actions'

// Храним null или false ?;
const initialState:TIngredientsState = { 
  ingredients:[],
  // загружены ли ингридиенты
  isIngredientsLoading:false,
  error:undefined,
}

export const burgerIngredients = createSlice({
  name:'burgerIngredients',
  initialState,

  reducers: {},

  selectors: {
    ingredientsState: (state) => state,
    
    getIngridients: (state) => state.ingredients,

    getIngredient: (state, id:string) => {
      console.log(state.ingredients);
      return state.ingredients.find(el => el._id == id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIngridients.pending, (state, action) => {
        state.isIngredientsLoading = true;
        state.error = undefined;
      })
      .addCase(checkIngridients.rejected, (state,action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      })
      .addCase(checkIngridients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
        
  }
})

export const { ingredientsState, getIngridients, getIngredient } = burgerIngredients.selectors;

