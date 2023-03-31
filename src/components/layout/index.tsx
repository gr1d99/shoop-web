import { AppLayout } from './app-layout';
import React from 'react';

const withAppLayout = <P,>(Component: React.FC<P>): React.FC<P> => {
  const WithLayout = (props: React.ComponentProps<any>): JSX.Element => {
    return (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    );
  };

  return WithLayout;
};

export { withAppLayout };
