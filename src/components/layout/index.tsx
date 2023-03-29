import { AppLayout } from './app-layout';
import React from 'react';

const withAppLayout = (Component: React.FunctionComponent): React.FunctionComponent => {
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
