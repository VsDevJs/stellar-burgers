import { FC, useMemo, useState, useRef, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';
import { getStateConstructor, createOrder, clearModal } from '@slices';
import userEvent from '@testing-library/user-event';
import { useNavigate, useLocation } from 'react-router-dom';
// Нужно делать еще один слайс // Нужно ли это хранить в куки ? Думаю да

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getStateConstructor);
  const dispatch = useDispatch();

  const navigate = useNavigate(); 
  const location = useLocation();
  /* Для отмены запроса http */
  const orderPromise = useRef<{ abort:() => void } | null >(null);

  const { orderRequest, orderModalData} = constructorItems;

  useEffect(() => {

    /* Делаем ссылку на заказ, т.к она обще доступная, чтобы после формирования её можно было бы кому-то отослать */
    if(orderModalData) {
      
      navigate(`/feed/${orderModalData?.order.number}`, 
        {state:{ fromModal:location }});
    }

  },[orderModalData])



  // Нажимаем отправить, формируется заказ
  const onOrderClick = () => {
    
    if (!constructorItems.bun || orderRequest) 
      return;
    
    const map = [...constructorItems.ingredients, constructorItems.bun].map(el => el._id);
    
    const p = dispatch(createOrder(map));
    
    orderPromise.current = p;
  };

  const closeOrderModal = () => {

    // 1. При закрытии нужно поменять ссылку на обратную 
    // 2. 
    orderPromise.current?.abort();
    orderPromise.current = null;
    dispatch(clearModal());
    navigate(location.pathname);
  };

  // Считает булки 2 + остальные ингридиенты (useMemo - чтобы не делать пересчёт);
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
        constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData?.order ?? null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
