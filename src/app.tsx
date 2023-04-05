import { withAppLayout } from './components/layout';
import { withAuthProvider } from './contexts/auth-context';
import Home from './pages/home';

const App = (): JSX.Element => {
  return (
    <>
      <Home />
    </>
  );
};

export default withAuthProvider(withAppLayout(App));
