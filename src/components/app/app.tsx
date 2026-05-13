import { ConstructorPage } from '@pages';

import {
  Feed,
  Login,
  ForgotPassword,
  ResetPassword,
  NotFound404,
  Profile,
  ProfileOrders,
  Register
} from '@pages';

import '../../index.css';

import styles from './app.module.css';

import {
  AppHeader,
  OrderInfo,
  Modal,
  IngredientDetails,
  ProtectedRoute
} from '@components';

import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import { Preloader } from '@ui';
import { ingredientsState } from '@selectors';
import { useSelector, useDispatch } from '../../services/store';
import { checkIngridients, checkUserAuth } from '@slices';
import { useEffect } from 'react';

const App = () => {

  const dispatch = useDispatch();

  const { isIngredientsLoading, ingredients, error } = useSelector(ingredientsState);
  const location = useLocation();
  const background = location.state?.background;

  // Когда заказ сформируется, можно отправить ссылку кому-нибудь
  const orderResponse = location.state?.fromModal;

  useEffect(() => {
    dispatch(checkIngridients());
    dispatch(checkUserAuth());
  },
    [dispatch])

  return (
    <div className={styles.app}>

      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length > 0 ? (
        <>
          <Routes location={orderResponse || background || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path={'/feed'} element={<Feed />} />
            <Route path="/feed/:number" element={<OrderInfo />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />

            <Route path='/login' element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>} />

            <Route path='/register' element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>} />

            <Route path='/forgot-password' element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            } />
            <Route path='/reset-password' element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            } />
            <Route path='/*' element={<NotFound404 />} />

            {/* Для зарегистрированных юзеров */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/profile/orders" element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            } />

            <Route path="/profile/orders/:number" element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            } />
          </Routes>

          {(background && !orderResponse) && (
            <Routes>
              <Route
                path="/feed/:number"
                element={
                  <Modal title={'Информация по конкретному ордеру'} onClose={() => window.history.back()}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path="/ingredients/:id"
                element={
                  <Modal title={'Информация по ингридиенту'} onClose={() => window.history.back()}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <Modal
                      title='Детали заказа'
                      onClose={() => window.history.back()}
                    >
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      )}
    </div>
  );
};

export default App;
