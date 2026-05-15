import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { login, selectError } from '@slices';
import { useSelector, useDispatch } from '../../services/store';

export const Login: FC = () => {
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const handleSubmit = async (e: SyntheticEvent) => {
    
    e.preventDefault();
    await dispatch(login({email,password})).unwrap();
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
