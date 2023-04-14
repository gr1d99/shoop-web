import { type FormValues } from '../pages/login/types';
import { type FormikHelpers } from 'formik';
import { type CartResource, type UserResource } from '../types';

export interface AuthCtxInitialState {
  loading: boolean;
  authenticated: boolean;
  token: string;
  username: string;
  identity: string;
}

export type AuthCtxAction =
  | {
      type: 'SET_LOADING';
      payload: boolean;
    }
  | {
      type: 'AUTHENTICATE';
      payload: string | null;
    };

export interface IAuthContext extends AuthCtxInitialState {
  signInUser: (data: FormValues, setSubmitting: FormikHelpers<FormValues>['setSubmitting']) => void;
  signOutUser: () => Promise<void>;
}

/**
 * Current user context types and interfaces
 * */
export interface CurrentUserInitialState {
  user: UserResource | null;
  cart: CartResource | null;
}

export interface CurrentUserAction {
  type: 'SET_CURRENT_USER';
  payload: UserResource | null;
}
export interface CurrentUserCtx extends CurrentUserInitialState {
  userLoaded: boolean;
}
