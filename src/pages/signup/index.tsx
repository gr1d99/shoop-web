import React from 'react';
import Card from '../../components/cards';
import { withAppLayout } from '../../components/layout';
import { useAuth } from '../../contexts/auth-context';
import { SignupForm } from './components/form';
import { type SignupFormProps } from './types';
const SignupPage = (): JSX.Element => {
  const { signInUser } = useAuth();
  const handleSubmit: SignupFormProps['handleSubmit'] = (values, setSubmitting) => {
    signInUser(values, setSubmitting);
  };
  return (
    <div className="mx-auto flex w-full justify-center rounded lg:w-1/2">
      <Card>
        <Card.Content className="flex flex-1 px-4">
          <SignupForm handleSubmit={handleSubmit} />
        </Card.Content>
      </Card>
    </div>
  );
};

if (import.meta.env.DEV) {
  SignupPage.whyDidYouRender = true;
}

export default withAppLayout(SignupPage);
