import { type IAuthContext } from '../../contexts/types';
import React from 'react';
import { AuthContext } from '../../contexts/auth-context';

const useAuth = (): IAuthContext => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw Error(`AuthProvider needs to be wrapped around the component`);
  }

  return context;
};

export { useAuth };
