import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getProfileOrders, fetchProfileOrders, isLoadingProfileOrders, selectUser } from '@slices';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  
  const orders:TOrder[] = useSelector(getProfileOrders);
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingProfileOrders)
  const user = useSelector(selectUser)

  useEffect(() => {
    
    if(user && orders.length === 0 && !isLoading)
      dispatch(fetchProfileOrders());

  }, [orders.length, dispatch, user])

  if(!isLoading)
    return <Preloader />

  if (!orders || orders.length === 0) {
    return <div>Заказы отсутствуют</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};