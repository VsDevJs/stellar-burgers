import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store'; 
import { getFeeds, getOrders, getFeedState } from '@slices';

export const Feed: FC = () => {
  
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const { success } = useSelector(getFeedState)

  useEffect(() => {

    dispatch(getFeeds());

  },[dispatch])

  if (!orders || orders.length === 0 || success == false) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {dispatch(getFeeds())}} />;
};
