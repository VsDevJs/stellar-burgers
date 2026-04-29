import { TUser } from "@utils-types";

export type TUserState = {
  user: null | TUser;
  isAuthChecked: boolean;
  error:string,
  isLoading:boolean
};