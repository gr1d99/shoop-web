import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './app';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';

const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  }
]);

export default router;
