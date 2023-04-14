import React from 'react';

import { type CurrentUserCtx, type CurrentUserAction, type CurrentUserInitialState } from './types';

import { useFetchUsers } from '../queries/users';
import { useAuth } from '../utils/hooks/use-auth';

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

  return state;
};

const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { identity, authenticated } = useAuth();

  const isFetchUserEnabled = identity !== '' && authenticated && state.user == null;
  const { data: response, isSuccess: userLoaded } = useFetchUsers(
    { email: identity },
    { isEnabled: isFetchUserEnabled }
  );
  const users = response?.data;
  const user = users?.[0];

  React.useEffect(() => {
    if (user !== undefined) {
      dispatch({ type: 'SET_CURRENT_USER', payload: user });
    }
  }, [user]);

  return (
    <CurrentUserContext.Provider value={{ ...state, userLoaded }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
