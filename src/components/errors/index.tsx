// import { NotFound } from './not-found';
// import { ServerError } from './server-error';
import React from 'react';
import ErrorBoundary from '../error-boundary';

const withErrorBoundary = <P,>(Component: React.FC<P>) => {
  type Props = React.ComponentProps<any> & {
    fallback: React.ReactNode | null;
  };
  const WithErrorBoundary = (props: Props) => {
    const { fallback, ...rest } = props;
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...rest} />
      </ErrorBoundary>
    );
  };

  return WithErrorBoundary;
};

export { withErrorBoundary };
