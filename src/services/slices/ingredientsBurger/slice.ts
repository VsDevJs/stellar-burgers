import { createSlice } from "@reduxjs/toolkit";
import { TIngredientsState, } from './type'
import { checkIngridients } from './actions'

const initialState:TIngredientsState = { 
  ingredients:[],
  // загружены ли ингредиенты
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

