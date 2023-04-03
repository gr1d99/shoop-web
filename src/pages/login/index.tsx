import React from 'react';
import Card from '../../components/cards';
import { withAppLayout } from '../../components/layout';
import { useAuth } from '../../contexts/auth-context';
import { LoginForm } from './components/form';
import { type LoginFormProps } from './types';
const LoginPage = (): JSX.Element => {
  const { signInUser } = useAuth();
  const handleSubmit: LoginFormProps['handleSubmit'] = (values, setSubmitting) => {
    signInUser(values, setSubmitting);
  };
  return (
    <div className="w-full lg:w-1/2 flex justify-center mx-auto rounded">
      <Card>
        <Card.Content className="flex flex-1 px-4">
          <LoginForm handleSubmit={handleSubmit} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default withAppLayout(LoginPage);
