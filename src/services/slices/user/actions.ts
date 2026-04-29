import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { getUserApi, registerUserApi, loginUserApi, logoutApi, TLoginData, refreshToken, TRegisterData, updateUserApi,
deleteCookie
} from '@api';
import { TUser } from '@utils-types';
import { setUser, setAuthChecked } from '@slices';

// Проверяем юзера на то, есть ли он в системе;
// fetchWithRefresh в getUserApi возвращает success;
export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const responseUser = await getUserApi();

      if (responseUser.success) {
        dispatch(setUser(responseUser.user));
      }

      return responseUser;
    } catch (err) {
      // 
      return rejectWithValue(err);
    } finally {
      dispatch(setAuthChecked(true));
    }
  }
);

// Кладём токен в 
export const login = createAsyncThunk("user/login", 
  async (data:TLoginData) => {

    // Сначала getUserApi (проверяет, что нет токенов) если его нет, то уже loginUserApi
    return await loginUserApi(data); // записал в куки и в локал сторедж в utils.ts;

});

export const logout = createAsyncThunk("user/logout", 
  async () =>{
    const response = await logoutApi();

    if(response.success) {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return response;
    }
  }
);

export const registerUser = createAsyncThunk('user/register',
  async (data:TRegisterData) =>
    await registerUserApi(data)
)

// 
export const updateUser = createAsyncThunk('user/update',
  async (data:Partial<TRegisterData>) => {

    return updateUserApi(data);
  }
)