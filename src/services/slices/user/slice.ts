import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { login, logout, updateUser, registerUser } from "./actions";
import { TUserState } from '@slices'

// checkUserAuth ставиться благодаря async thunk checkAuthUser
export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading:false,
  error:'',
};

// Сделан общий addMatcher для reject состояния
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Генератор экшена, одна точка правды. Чтобы задиспатчить { type, payload } 
    // под капотом 'user/setUser'; 
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuthChecked = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = '';
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        if(action.payload?.success)
          state.user = null;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(registerUser.pending,(state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled,(state, action) => {
        state.error = '';
        state.user = action.payload;
        state.isLoading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action:any) => {
          state.isLoading = false;
          if(action.error.message)
            state.error = action.error?.message ?? "Unknown error"
          
        }
      )
  },
});

export const { setUser, setAuthChecked } = userSlice.actions;
export const { selectUser, selectIsAuthChecked, selectError, selectIsLoading } = userSlice.selectors;


;