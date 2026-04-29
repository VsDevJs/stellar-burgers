import { FC, memo,  } from 'react';
import { useLocation,  } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

import { setIngredient, getStateConstructor} from '@slices'
import { useSelector, useDispatch } from '../../services/store'; 
import { nanoid } from '@reduxjs/toolkit';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {

    const location = useLocation();
    // Проосто тест полуяения в хранилище добавленых ингридиентов (getItemConstructor) - селектор
    const selector = useSelector(getStateConstructor);
    const dispatch = useDispatch();
    
    
    const handleAdd = () => {
      console.log (selector);
      dispatch(setIngredient({...ingredient, id:nanoid()}));
    };
    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
