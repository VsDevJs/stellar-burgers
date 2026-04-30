import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TConstructorIngredient } from "@utils-types";
import { TBurgerState } from './type';
import { createOrder } from './action';

const initialState:TBurgerState = {
  bun: null,
  ingredients:[],
  
  // Для прелоадера;
  orderRequest:false,

  // Данные для модального окна;
  orderModalData:null,
}

export const burgerConstructor = createSlice({

  name:'burgerConstructor',
  initialState,

  reducers: {
    setIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if(action.payload.type == 'bun')
        state.bun = action.payload;
      else {
        state.ingredients.push(action.payload);
      }
    },

    deleteIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(el => el._id != action.payload._id)
    },

    moveUp: (state, action:PayloadAction<number>) => {
      const number = action.payload;
      state.ingredients = [
        ...state.ingredients.slice(0, number - 1),
        state.ingredients[number],
        state.ingredients[number - 1],
        ...state.ingredients.slice(number + 1)
      ]
    },

    moveDown: (state, action:PayloadAction<number>) => {
      const number = action.payload;
      
      state.ingredients = [
        ...state.ingredients.slice(0, number),
        state.ingredients[number + 1],
        state.ingredients[number],
        ...state.ingredients.slice(number + 2)
      ]
    },

    clearModal:(state)=> { state.orderModalData = null },

  },

  selectors: {
    getStateConstructor:(state) => state,
  },

  extraReducers: (builder) => {
    builder.addCase(createOrder.pending,(state)=>{
        state.orderRequest = true;
    })
    .addCase(createOrder.rejected,(state)=>{
        state.orderRequest = false;
    })
    .addCase(createOrder.fulfilled,(state, action)=>{
        state.orderRequest = false;
        state.ingredients = [];
        state.bun = null;
        state.orderModalData = action.payload;
    })
  }
});


export const { setIngredient, deleteIngredient, clearModal, moveDown, moveUp } = burgerConstructor.actions;
export const { getStateConstructor } = burgerConstructor.selectors;