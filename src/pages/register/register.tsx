import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser, selectError } from '@slices';
import { useSelector, useDispatch } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUser } from '@slices';

export const Register: FC = () => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(selectError);
  const user = useSelector(selectUser);
  // Откуда пришли
  const location = useLocation()
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    dispatch(registerUser({name:userName, email, password}))
    e.preventDefault();
  };

  if(user) {
    // from - откуда пришли , А если неоткуда, то 
    return <Navigate to={location.state?.pathname?.from || location} replace/>
  }

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
