import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { Navigate } from 'react-router-dom';
import { registerUser, selectUser, selectError } from '@slices';
import { useSelector, useDispatch } from '../../services/store';

// Делаем синхронный экшен на регистрацию;
// Редирект отсюда на предыдущую страницу;


export const Register: FC = () => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    dispatch(registerUser({name:userName, email, password}))
    e.preventDefault();
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
