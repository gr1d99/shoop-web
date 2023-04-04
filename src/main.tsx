import './utils/wdyr';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import RootLoader from './components/loaders';
import './index.css';
import ReactQueryProvider from './contexts/react-query-context';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
      <RouterProvider router={router} fallbackElement={<RootLoader />} />
    </ReactQueryProvider>
  </React.StrictMode>
);
