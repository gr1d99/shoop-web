type RouteName = 'root' | 'login';
type AppRoutesPath = '/' | '/login';
export const routePaths: { [key in RouteName]: AppRoutesPath } = {
  root: '/',
  login: '/login'
};
