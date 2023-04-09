import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import loadable from '@loadable/component';
import { routerLoaders } from './loaders';

const LoginPage = loadable(
  async (/* webpackChunkName: "Login Page" */) => await import('../pages/login')
);
const SignupPage = loadable(
  async (/* webpackChunkName: "Signup Page" */) => await import('../pages/signup')
);
const App = loadable(async (/* webpackChunkName: "Home Page" */) => await import('../app'));
const AppLayout = loadable(async () => await import('../components/layout'));
const ProductsPage = loadable(async () => await import('../pages/products'));
const ProductPage = loadable(async () => await import('../pages/product'));

const index = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    loader: routerLoaders.rootLoader,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignupPage />
      },
      {
        path: 'category/:categorySlug',
        element: <ProductsPage />,
        loader: routerLoaders.categoriesProductsLoader
      },
      {
        path: 'product/:productSlug',
        element: <ProductPage />,
        loader: routerLoaders.productLoader
      }
    ]
  }
]);

export default index;
