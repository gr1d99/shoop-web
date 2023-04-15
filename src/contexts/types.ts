import { type FormValues } from '../pages/login/types';
import { type FormikHelpers } from 'formik';
import { type CartItemResources, type CartResource, type UserResource } from '../types';

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
  user: UserResource['data'] | null;
  cart: CartResource['data'] | null;
  cartItems: CartItemResources | null;
}

export type CurrentUserAction =
  | {
      type: 'SET_CURRENT_USER';
      payload: UserResource['data'] | null;
    }
  | {
      type: 'SET_CART';
      payload: CartResource['data'] | null;
    }
  | {
      type: 'SET_CART_ITEMS';
      payload: CartItemResources | null;
    };
export interface CurrentUserCtx extends CurrentUserInitialState {
  userLoaded: boolean;
}
