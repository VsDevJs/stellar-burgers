export {  
  setUser, 
  setAuthChecked, 
  selectUser, 
  selectIsAuthChecked,
  userSlice,
  selectError, selectIsLoading
} from './slice';

export {
  login,
  logout,
  updateUser,
  registerUser,
  checkUserAuth
} from './actions';

export { type TUserState } from './type';
