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

  // Отправляем логин и пароль асинхронным экшеном и диспатчим юзера если всё ок
  // Если юзера нет, то отправляем как бы fetch (а тот уже сам проверит че да как)
  

  // Вот это можно в защитники наверное выносить...
  // if(user)
  //   return <Navigate to='/'/> 
  console.log(email);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(login({email,password})).unwrap();
    if(user) {
      console.log(location.state?.pathname?.from); 
      // чтобы отправить юзера обратно на страницу , которая onlyAuth
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
