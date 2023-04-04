import { AppLayout } from './app-layout';
import React from 'react';
import AuthProvider from '../../contexts/auth-context';

const withAppLayout = <P,>(Component: React.FC<P>): React.FC<P> => {
  const WithLayout = (props: React.ComponentProps<any>): JSX.Element => {
    return (
      <AuthProvider>
        <AppLayout>
          <Component {...props} />
        </AppLayout>
      </AuthProvider>
    );
  };

  return WithLayout;
};

export { withAppLayout };
