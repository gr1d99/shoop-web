import * as React from 'react';
import { createBrowserRouter, type LoaderFunctionArgs } from 'react-router-dom';
import loadable from '@loadable/component';
import { fetchCategories } from './pages/home/api/categories';
import { type TNavigation, type TNavigationChildren } from './components/nav/types';
import AppLayout from './components/layout';

const LoginPage = loadable(
  async (/* webpackChunkName: "Login Page" */) => await import('./pages/login')
);
const SignupPage = loadable(
  async (/* webpackChunkName: "Signup Page" */) => await import('./pages/signup')
);
const App = loadable(async (/* webpackChunkName: "Home Page" */) => await import('./app'));

const navigation: TNavigation = {
  Home: { isButton: false, name: 'Home', href: '/', icon: null, current: true, children: [] },
  Categories: {
    isButton: true,
    name: 'Categories',
    href: '#',
    icon: null,
    current: false,
    children: []
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    loader: async (_args: LoaderFunctionArgs) => {
      try {
        const { data } = await fetchCategories({ page: 1, limit: 10 });
        const categoriesChildren: TNavigationChildren = data.map((category) => {
          const { id, attributes } = category;
          const { name, slug } = attributes;
          const href =
            slug !== null && typeof slug === 'string' ? `/categories/${slug}` : `/categories/${id}`;
          return {
            id,
            name,
            href,
            current: false
          };
        });
        return {
          ...navigation,
          Categories: { ...navigation.Categories, children: categoriesChildren }
        };
      } catch (e) {
        console.error(e);
        return navigation;
      }
    },
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
      }
    ]
  }
]);

export default router;
