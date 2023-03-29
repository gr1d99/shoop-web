import React from 'react';
import Card from '../components/cards';
import { withAppLayout } from '../components/layout';

const SignupPage = (): JSX.Element => {
  return (
    <Card>
      <Card.Header title="Signup" />
    </Card>
  );
};

export default withAppLayout(SignupPage);
