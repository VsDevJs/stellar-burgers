import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { selectUser, updateUser } from '@slices';
import { useSelector, useDispatch } from '../../services/store'; 


// Делаем outlet
export const Profile: FC = () => {
  /** TODO: взять переменную из стора */

  // useSelector возвращает всегда туже ссылку, поэтому нт бесконечного цикла;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  // Если user null

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {

    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  // Обновляем с паролем и без
  const handleSubmit = (e: SyntheticEvent) => {
      e.preventDefault();
    if(!formValue.password.trim())
      dispatch(updateUser({
        password:formValue.password, 
        name:formValue.name}
      ));
    else
      dispatch(updateUser({...formValue}));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
