import { setCookie, getCookie } from './cookie';
import { TIngredient, TOrder, TOrdersData, TUser, TServerResponse, TOwner, TNewOrder, TFeedsResponse } from './types';
export { deleteCookie } from './cookie';

const URL = process.env.BURGER_API_URL;

// Возвращает промис c reject {} - ошибка внутри
const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

// Добавляет в объект поля refreshToken и accessToken
// { message: Token is invalid,   success: false; }
export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      return refreshData;
    });

  // Сначала проверяет access токен, если ошибка, то потом refresh и добавляет новые access и refresh
export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
) => {
  try {
  // success + message
    const res = await fetch(url, options);
  // возвращаем json с юзером или заказами из респонса (по токену)
    return await checkResponse<T>(res);
  } catch (err:any) {
    if(err.name === 'AborError') throw err;
  // при некорректно юзере не будет jwt ошибки, expired - истёкший токен
    if ((err as { message: string }).message === 'jwt expired') {

  // Запроос рефрешь токена и получаем
      const refreshData = await refreshToken();

  // Если есть headers, то добавляем в authorization новый refreshData.accessToken
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }

  // Заново запрашиваем уже с актуальным options headers accessToken
  // refreshToken вернул новые токены
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TOrdersResponse = TServerResponse<{
  data: TOrder[];
}>;

// Простое получение ингридиентов (соусы, булки, начинки);
export const getIngredientsApi = () =>
  fetch(`${URL}/ingredients`)
    .then((res) => checkResponse<TIngredientsResponse>(res))
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });

// Все заказы, доступны всем
export const getFeedsApi = () =>
  fetch(`${URL}/orders/all`)
    .then((res) => checkResponse<TFeedsResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

// Получение заказов с учетом токена авторизации; (конкретно нам)
// Все оформленные заказы храняться по апи
export const getOrdersApi = () =>
  fetchWithRefresh<TFeedsResponse>(`${URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit
  }).then((data) => {
    if (data?.success) return data.orders;
    return Promise.reject(data);
  });

type TNewOrderResponse = TServerResponse<{
  order: TNewOrder;
  name: string;
}>;

// Отправка ингридиентов по api и формирование заказа
// добавил signal для отмены заказа
export const orderBurgerApi = (data: string[], signal?:AbortSignal) =>
  fetchWithRefresh<TNewOrderResponse>(`${URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: data
    }),
    signal,
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });

type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

// Конкретный заказ. Может кто угодно смотреть (наверное для ленты заказов)
export const getOrderByNumberApi = (number: number) =>
  fetch(`${URL}/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse<TOrderResponse>(res));

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

// Регистрируемся по name, pass, email
// Возвращает succes и два токена + user
export const registerUserApi = (data: TRegisterData) =>
  fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export type TLoginData = {
  email: string;
  password: string;
};

// Авторизация, возвращает токены и success поле. Каждый раз новый при авторизации причем одного и того же юзера;
// Дополнил cookie и local storage;

export const loginUserApi = (data: TLoginData) =>
  fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) { 
        setCookie('accessToken',data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data
      };
      return Promise.reject(data);
    });

// Проверяет email и отправляет письмо
export const forgotPasswordApi = (data: { email: string }) =>
  fetch(`${URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

// Новый пароль + токен отдаём
// Какой токен, refresh или обычный ?
export const resetPasswordApi = (data: { password: string; token: string }) =>
  fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export type TUserResponse = TServerResponse<{ user: TUser }>;

// Получаем ответ валиден ли accessToken токен юзера 
// Юзера и поле success - true или поле success false;
// Берёт юзера и проверяет по токену 
export const getUserApi = () =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    headers: {
      authorization: getCookie('accessToken')
    } as HeadersInit
  });

// update и возвращает скорректированные данные в json
export const updateUserApi = (user: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify(user)
  });

// Разлогин, только удаляет на сервере токен (А у нас нет, будем удалять locale storage + token)
export const logoutApi = () =>
  fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((res) => checkResponse<TServerResponse<{}>>(res));