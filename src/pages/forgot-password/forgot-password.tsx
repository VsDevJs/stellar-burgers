import { FC, useState, SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { Preloader } from '@ui';

export const ForgotPassword: FC = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        
        navigate('/reset-password', { state: location.state, replace: true });
      })
      .catch((err) => setError(err));
  };

return (
  <>
    {isLoading && <Preloader />}
    {!isLoading && (
      <ForgotPasswordUI
        errorText={error?.message}
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
    )}
  </> 
  )
}
