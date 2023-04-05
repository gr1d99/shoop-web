import React from 'react';
import Card from '../../components/cards';
import { withAppLayout } from '../../components/layout';
import { SignupForm } from './components/form';
import {
  type FormValues,
  type SignupFormProps,
  type SignupResponse,
  type SignupValues
} from './types';
import { useMutation } from 'react-query';
import { createUserAsync } from './api/create-user';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { ErrorListToast } from '../../components/toast/error';
import { SuccessToast } from '../../components/toast/success';
import { utils } from '../../utils';

const SignupPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { mutate } = useMutation<SignupResponse, any, SignupValues>(createUserAsync, {});
  const handleSubmit: SignupFormProps['handleSubmit'] = (values, setSubmitting) => {
    const payload: Partial<FormValues> & { first_name: string; last_name: string } = {
      ...values,
      first_name: values['first-name'],
      last_name: values['last-name']
    };
    delete payload['first-name'];
    delete payload['last-name'];
    delete payload['confirm-password'];

    mutate(payload as SignupValues, {
      onSuccess: () => {
        toast.custom(
          <SuccessToast
            title={'Account created!'}
            message={'Login with your username and password'}
          />
        );
        navigate('/login');
      },
      onError: (error: any) => {
        if (isAxiosError(error)) {
          const requestErrors = error?.response?.data;
          if ('errors' in requestErrors) {
            toast.custom(
              <ErrorListToast
                title={'Signup errors'}
                errors={utils.errors.buildServerFormErrors(requestErrors.errors)}
              />
            );
          }
          return;
        }
        toast.custom(<ErrorListToast title={'Signup errors'} errors={[JSON.stringify(error)]} />);
      },
      onSettled: () => {
        setSubmitting(false);
      }
    });
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
