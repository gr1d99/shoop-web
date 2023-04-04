import { withAppLayout } from './components/layout';
import { withAuthProvider } from './contexts/auth-context';

const App = ({ name }: { name: string }): JSX.Element => {
  return <h1>Home Page</h1>;
};

export default withAuthProvider(withAppLayout(App));
