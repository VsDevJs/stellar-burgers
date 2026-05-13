import { FC, useMemo, useRef, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';
import { getStateConstructor, createOrder, clearModal } from '@slices';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectUser } from '@slices';

export const BurgerConstructor: FC = () => {

  const constructorItems = useSelector(getStateConstructor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  /* Для отмены запроса http */
  const orderPromise = useRef<{ abort: () => void } | null>(null);

  const { orderRequest, orderModalData } = constructorItems;

  useEffect(() => {

    /* Формируем ссылку на заказ */
    if (orderModalData) {
      navigate(`/feed/${orderModalData?.order.number}`,
        { state: { fromModal: location } });
    }

  }, [orderModalData])

  const onOrderClick = () => {

    if (!constructorItems.bun || orderRequest)
      return;

    if (!user)
      return navigate('/login');

    const map = [
      constructorItems.bun,
      ...constructorItems.ingredients,
      constructorItems.bun].map(el => el._id);

    const p = dispatch(createOrder(map));
    console.log('Ордер сформирован:', p);
    orderPromise.current = p;

  };

  const closeOrderModal = () => {

    orderPromise.current?.abort();
    orderPromise.current = null;
    dispatch(clearModal());
    navigate(location.pathname);
  };

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
