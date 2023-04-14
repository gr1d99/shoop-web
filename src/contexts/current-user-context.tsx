import React from 'react';

import { type CurrentUserCtx, type CurrentUserAction, type CurrentUserInitialState } from './types';

import { useFetchUsers } from '../queries/users';
import { useAuth } from '../utils/hooks/use-auth';
import { useFetchCart } from '../queries/carts';

const initialState: CurrentUserInitialState = {
  user: null,
  cart: null
};
export const CurrentUserContext = React.createContext<CurrentUserCtx>(
  initialState as CurrentUserCtx
);

const reducer = (state: CurrentUserInitialState = initialState, action: CurrentUserAction) => {
  if (action.type === 'SET_CURRENT_USER') {
    return { ...state, user: action.payload };
  }

  if (action.type === 'SET_CART') {
    return { ...state, cart: action.payload };
  }

  return state;
};

const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { identity, authenticated } = useAuth();

  const isFetchUserEnabled = identity !== '' && authenticated && state.user == null;
  const { data: usersResponse, isSuccess: userLoaded } = useFetchUsers(
    { email: identity },
    { isEnabled: isFetchUserEnabled }
  );
  const users = usersResponse?.data;
  const user = users?.[0];
  const currentCartId = user?.attributes?.current_cart?.id;
  const isFetchCartEnabled = authenticated && currentCartId !== undefined;
  const { data: cartsResponse } = useFetchCart(currentCartId, {
    isEnabled: isFetchCartEnabled
  });
  const cart = cartsResponse?.data;

  React.useEffect(() => {
    if (user !== undefined) {
      dispatch({ type: 'SET_CURRENT_USER', payload: user });
    }

    if (cart !== undefined) {
      dispatch({ type: 'SET_CART', payload: cart });
    }
  }, [user, cart]);

  return (
    <CurrentUserContext.Provider value={{ ...state, userLoaded }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
