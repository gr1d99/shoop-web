import React from 'react';
import Card from '../../components/cards';
import { withAppLayout } from '../../components/layout';
import { LoginForm } from '../components/form';
import { type LoginFormProps } from '../components/types';
import { useNavigate } from 'react-router-dom';

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const handleSubmit: LoginFormProps['handleSubmit'] = (event) => {
    event.preventDefault();
    navigate('/');
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
