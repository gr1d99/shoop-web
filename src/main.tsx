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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 10000,
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
  </React.StrictMode>
);
