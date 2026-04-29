import { FC, useEffect, useLayoutEffect, useState, useRef } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';

import { useSelector } from '../../services/store';
import { getIngredient, getStateConstructor, ingredientsState } from '@slices';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  
  const { id }  = useParams();
  const {isIngredientsLoading} = useSelector(ingredientsState);
 
  const ingredientData = useSelector(state => getIngredient(state, String(id)));

  if (isIngredientsLoading || !ingredientData) {

    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData as TIngredient} />;
};
