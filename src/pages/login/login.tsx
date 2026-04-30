import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { Navigate, useLocation } from 'react-router-dom';
import { login, selectUser, selectError } from '@slices';
import { useSelector, useDispatch } from '../../services/store';

export const Login: FC = () => {
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const location = useLocation()
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectUser);

  const handleSubmit = async (e: SyntheticEvent) => {
    
    e.preventDefault();
    await dispatch(login({email,password})).unwrap();

    if(user) {
      return <Navigate to={location.state?.pathname?.from || '/'} replace/>
    }
    
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
