import React from 'react';
import Card from '../../components/cards';
import { LoginForm } from './components/form';
import { type LoginFormProps } from './types';
import { useAuth } from '../../utils/hooks/use-auth';
const LoginPage = (): JSX.Element => {
  const { signInUser } = useAuth();
  const handleSubmit: LoginFormProps['handleSubmit'] = (values, setSubmitting) => {
    signInUser(values, setSubmitting);
  };
  return (
    <div className="mx-auto flex w-full justify-center rounded lg:w-1/2">
      <Card>
        <Card.Content className="flex flex-1 px-4">
          <LoginForm handleSubmit={handleSubmit} />
        </Card.Content>
      </Card>
    </div>
  );
};

if (import.meta.env.DEV) {
  LoginPage.whyDidYouRender = true;
}

export default LoginPage;
