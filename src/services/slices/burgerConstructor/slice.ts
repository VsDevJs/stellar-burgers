import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTabMode, TIngredient, TConstructorIngredient, TOrder, TNewOrderResponse } from "@utils-types";
import { createOrder } from './action';

// orderModalData - Какой-то тип для модалки (данные походу)

type TBurgerState = {
  ingredients:TConstructorIngredient[],
  bun: TConstructorIngredient | null,
  orderRequest:boolean,
  orderModalData:null | TNewOrderResponse,
}

const initialState:TBurgerState = {

  // Сюда добавляем ингридиенты;
  bun: null,

  ingredients:[],

  // Для прелоадера;
  orderRequest:false,

  // Данные для модального окна;
  orderModalData:null,
}

/** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
// Делаем селектор чтобы взять ингридиент , т.к не требуется диспатча


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

      //[...a.slice(0,2-1),a[2],a[1],...a.slice(2+1,)]; 
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

    // clearModal
    clearModal:(state)=> { state.orderModalData = null },

  },
  // селекторы вызывают для получения состояния и не должны менять state
  selectors: {
    getStateConstructor:(state) => state,
    getIngredient: (state, id:string) => {
      console.log(state.ingredients);
      return state.ingredients.find(el => el._id == id);
    }
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
export const { getStateConstructor, getIngredient } = burgerConstructor.selectors;