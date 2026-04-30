import { TNewOrderResponse, TConstructorIngredient } from '@utils-types';

export type TBurgerState = {
  ingredients:TConstructorIngredient[],
  bun: TConstructorIngredient | null,
  orderRequest:boolean,
  orderModalData:null | TNewOrderResponse,
}
