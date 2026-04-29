import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedState, getStatusIngredients } from '@slices';

export const FeedInfo: FC = () => {
  
  const feed = useSelector(getFeedState);

  const { done:readyOrders, pending:pendingOrders } = useSelector(getStatusIngredients);
  
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
