import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUser } from '@slices';
import { useSelector } from '../../services/store'; 

// Добавил юзера для отображения
export const AppHeader: FC = () => {
  const user = useSelector(selectUser)

  return <AppHeaderUI userName={user?.name} />;
};
