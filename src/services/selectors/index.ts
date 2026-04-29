import { RootState } from '../store';
import { TOrder } from '@utils-types';
export { 
  ingredientsState,
  selectIsAuthChecked,  
  selectUser,
  getStateConstructor
} from '@slices';

// внешний селектор, чтобы получить состав ингридиентов и открытый infoorder

export const selectOrderByNumber = (state: RootState, arg: number | TOrder) => {

  
  // Если feedOrder нету, то мы должны feedIngridients сделать так, чтобы он 
  const feedOrder = typeof (arg) == 'number' ? state.feed.orders.find(o => o.number === arg) : arg;
  
  //const feedOrder ==  state.feed.orders.find(o => o.number === number);
  
  
  const feedIngridients = state.burgerIngredients.ingredients.filter(el => feedOrder?.ingredients.includes(el._id));
  
  console.log('Ингридиенты бургеров', state.burgerIngredients.ingredients);

  return { feedOrder, feedIngridients }

}


// 1. Делаем обёртку такую т.к нужен глобальный стейт;
// 2. Используем в thunk чтобы сдлать запрос асинхронный или просто отдать , если order уже есть;