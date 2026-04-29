import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/store";
import { selectIsAuthChecked, selectUser, selectIsLoading } from "@slices";
import { Preloader } from "@ui";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element

};

// url == /profile, onlyUnAuth = false, user == null
// url == /login, from = /profile, onlyUnAuth = true, user == null
// url == /login, from = /profile, onlyUnAuth = true, user != null
// url == /profile, onlyUnAuth = false, user != null
// url == /profile, onlyUnAuth = false, user == null

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: ProtectedRouteProps): React.JSX.Element => {

  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();
  console.log (location);
  console.log(isAuthChecked) // Определяем авторизован ли юзер
  console.log(onlyUnAuth) // Только для НЕ зарегистрированных
  console.log(user) // null или user 
  console.log('Происходит загрузка:', isLoading)
  if (isLoading) {
    return <Preloader />
  }

  // Только для авторизованного юзера;
  // Юзера нету;
  // Чекнут, что он проверен по авторизации;

  // Заходим profile/orders
  // Получаем profile/orders

  if (!onlyUnAuth && !user && isAuthChecked) {
    
    // { background: location } - чтобы вернулся а туже страницу после авторизации
    return <Navigate to="/login" state={{ from: location }} replace/>;
  }
  
  // Если маршрут только для неавторизованных, а пользователь авторизован
  if (onlyUnAuth && isAuthChecked && user) {
    const from = location.state?.from?.pathname ?? "/";
    return <Navigate to={from} replace />;
  }

  return children;
};
