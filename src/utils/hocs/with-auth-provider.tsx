import React from 'react';
import CurrentUserProvider from '../../contexts/current-user-context';
import AuthProvider from '../../contexts/auth-context';

const withAuthProvider = <P,>(Component: React.FC<P>) => {
  const WithAuthProvider = (props: React.ComponentProps<any>) => {
    return (
      <AuthProvider>
        <CurrentUserProvider>
          <Component {...props} />
        </CurrentUserProvider>
      </AuthProvider>
    );
  };

  return WithAuthProvider;
};

export { withAuthProvider };
