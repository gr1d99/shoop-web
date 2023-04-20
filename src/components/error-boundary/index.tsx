import React from 'react';
import { isAxiosError } from 'axios';
import { NotFound } from '../errors/not-found';
import { ServerError } from '../errors/server-error';

class ErrorBoundary extends React.Component<
  React.ComponentProps<any> & { fallback: React.ReactNode },
  { hasError: boolean; fallback: React.ReactNode | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, fallback: null };
  }

  static getDerivedStateFromError(error: any) {
    if (isAxiosError(error) && error.response != null) {
      const { status } = error.response;

      if (status === 404) {
        return { hasError: true, fallback: <NotFound /> };
      }

      if (status >= 500) {
        return { hasError: true, fallback: <ServerError /> };
      }
    }
  }

  // componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {}

  render() {
    if (this.state.hasError && this.state.fallback) {
      return this.state.fallback || this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
