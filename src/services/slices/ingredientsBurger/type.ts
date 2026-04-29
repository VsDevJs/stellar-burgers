import { TIngredient } from '@utils-types'

export type TIngredientsState = {
  ingredients:TIngredient[];
  isIngredientsLoading:boolean,
  error:undefined | string,
}