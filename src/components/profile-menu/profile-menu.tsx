import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { selectIsLoading, logout } from '@slices';
import { useDispatch, useSelector } from '../../services/store';

// пока не пойму зачем тут pathname;
export const ProfileMenu: FC = () => {

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // const isLoading = useSelector(selectIsLoading);

  const handleLogout = () => {
    dispatch(logout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};