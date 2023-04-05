import Button from '../../../components/button';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { type FormValues, type LoginFormProps } from '../types';
import { Form, Field, type FormikHelpers, ErrorMessage, Formik } from 'formik';
import { loginSchema } from '../schema';

const LoginForm = (props: LoginFormProps): JSX.Element => {
  const { handleSubmit } = props;
  return (
    <div className="min-h-full pb-2 sm:px-6 lg:px-2">
      <div className="flex w-full max-w-md flex-col space-y-2">
        <div>
          <h2
            className="text-center text-2xl font-bold tracking-tight text-gray-900 subpixel-antialiased"
            data-cy="header">
            Sign in to your account
          </h2>
        </div>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) => {
            handleSubmit(values, setSubmitting);
          }}
          validationSchema={loginSchema}
          enableReinitialize>
          {({ isSubmitting }) => {
            return (
              <Form
                className="flex w-full flex-col space-y-5 subpixel-antialiased"
                data-cy="login-form"
                method="post"
                noValidate>
                <Field type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <Field
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Email address"
                      data-cy="email"
                    />
                    <ErrorMessage
                      data-cy="email-error"
                      name="email"
                      className="pb-2 text-xs text-red-500"
                      component="div"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Password"
                      data-cy="password"
                    />
                    <ErrorMessage
                      name="password"
                      data-cy="password-error"
                      className="pb-2 text-xs text-red-500"
                      component="div"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <Field
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    label={'Sign in'}
                    loading={isSubmitting}
                    data-cy="submit"
                    icon={
                      <LockClosedIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    }
                  />
                </div>
                <div className="text-center text-sm">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500" href="/signup">
                    Create Account
                  </a>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export { LoginForm };
