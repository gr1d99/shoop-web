import React from 'react';
import Card from '../components/cards';
import { withAppLayout } from '../components/layout';
import { LoginForm } from './components/form';

const LoginPage = (): JSX.Element => {
  return (
    <div className="w-full lg:w-1/2 flex justify-center mx-auto rounded">
      <Card>
        <Card.Content className="flex flex-1 px-4">
          <LoginForm />
        </Card.Content>
      </Card>
    </div>
  );
};

export default withAppLayout(LoginPage);
