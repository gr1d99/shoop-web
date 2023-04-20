import './utils/wdyr';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import index from './router';
import RootLoader from './components/loaders';
import ReactQueryProvider from './contexts/react-query-context';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import './index.css';
import ErrorBoundary from './components/error-boundary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ReactQueryProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#000',
              borderRadius: 0
            }
          }}
        />
        <RouterProvider router={index} fallbackElement={<RootLoader />} />
      </ReactQueryProvider>
      <Analytics />
    </ErrorBoundary>
  </React.StrictMode>
);
