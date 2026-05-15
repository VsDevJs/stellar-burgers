import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/store";
import { selectIsAuthChecked, selectUser, selectIsLoading } from "@slices";
import { Preloader } from "@ui";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element
};

// Если пользователь авторизован, то выбиваем из register

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: ProtectedRouteProps): React.JSX.Element => {

  const user = useSelector(selectUser);
  // Устанавливается с помощью checkUserAuth из хранилища user
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />
  }

  // Для зареганных
  if (!onlyUnAuth && !user && isAuthChecked) {
    // Открываем profile/orders/number - редирект на login (+ сохранение локации в from)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // для не зареганных
  // здесь регистер не работает;
  if (onlyUnAuth && isAuthChecked && user) {

    // Перебрасывает туда, откуда пришли
    const from = location.state?.from?.pathname ?? '/';
    console.log('РЕДИРЕКТ ИЗ FROM', from);
    return <Navigate to={from} replace />;
  }

  // возвращает на login (children-ом);
  return children;

};
