import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './app';
import SignupPage from './pages/signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'signup',
        element: <SignupPage />
      }
    ]
  }
]);

export default router;
