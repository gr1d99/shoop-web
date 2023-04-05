import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import loadable from '@loadable/component';

const LoginPage = loadable(
  async (/* webpackChunkName: "Login Page" */) => await import('./pages/login')
);
const SignupPage = loadable(
  async (/* webpackChunkName: "Signup Page" */) => await import('./pages/signup')
);
const App = loadable(async (/* webpackChunkName: "Home Page" */) => await import('./app'));

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
