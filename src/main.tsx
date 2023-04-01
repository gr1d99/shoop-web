import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import RootLoader from './components/loaders';
import './index.css';
import ReactQueryProvider from './contexts/react-query-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} fallbackElement={<RootLoader />} />
    </ReactQueryProvider>
  </React.StrictMode>
);
