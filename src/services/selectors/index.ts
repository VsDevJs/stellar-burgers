import { RootState } from '../store';
import { TOrder } from '@utils-types';
export { 
  ingredientsState,
  selectIsAuthChecked,  
  selectUser,
  getStateConstructor
} from '@slices';

// Внешний селектор, чтобы получить состав ингридиентов и открытый infoorder

export const selectOrderByNumber = (state: RootState, arg: number | TOrder) => {

  // Возвращаем TOrder или number (id), в зависимости от логики thunk getFeedOrder в feedOrders
  const feedOrder = typeof (arg) == 'number' ? state.feed.orders.find(o => o.number === arg) : arg;
  
  const feedIngridients = state.burgerIngredients.ingredients.filter(el => feedOrder?.ingredients.includes(el._id));
  
  return { feedOrder, feedIngridients }

}