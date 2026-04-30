import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/store";
import { selectIsAuthChecked, selectUser, selectIsLoading } from "@slices";
import { Preloader } from "@ui";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: ProtectedRouteProps): React.JSX.Element => {

  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />
  }

  if (!onlyUnAuth && !user && isAuthChecked) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (onlyUnAuth && isAuthChecked && user) {
    const from = location.state?.from?.pathname ?? "/";
    return <Navigate to={from} replace />;
  }

  return children;

};
