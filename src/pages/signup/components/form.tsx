import Button from '../../../components/button';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { type FormValues, type SignupFormProps } from '../types';
import { Form, Field, type FormikHelpers, ErrorMessage, Formik } from 'formik';
import { signupSchema } from '../schema';

const SignupForm = (props: SignupFormProps): JSX.Element => {
  const { handleSubmit } = props;
  return (
    <div className="min-h-full pb-2 sm:px-6 lg:px-2">
      <div className="flex w-full max-w-md flex-col space-y-2">
        <div>
          <h2
            className="text-center text-2xl font-bold tracking-tight text-gray-900"
            data-cy="header">
            Create account
          </h2>
        </div>
        <Formik
          initialValues={{
            'first-name': '',
            'last-name': '',
            phone: '',
            email: '',
            password: '',
            'confirm-password': ''
          }}
          onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) => {
            handleSubmit(values, setSubmitting);
          }}
          validationSchema={signupSchema}>
          {({ isSubmitting }) => {
            return (
              <Form
                className="flex w-full flex-col space-y-5"
                data-cy="signup-form"
                method="post"
                noValidate>
                <div className="flex flex-wrap space-y-1 lg:flex-nowrap lg:space-x-2 lg:space-y-0">
                  <div className="w-full">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      First Name
                    </label>
                    <div className="mt-1">
                      <Field
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="first-name"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        data-cy="first-name"
                      />
                    </div>
                    <ErrorMessage
                      name={'first-name'}
                      className="pt-1 text-xs text-red-500"
                      data-cy="first-name-error"
                      component="div"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Last Name
                    </label>
                    <div className="mt-1">
                      <Field
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="last-name"
                        required
                        data-cy="last-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <ErrorMessage
                      name={'last-name'}
                      className="pt-1 text-xs text-red-500"
                      data-cy="last-name-error"
                      component="div"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-1">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      data-cy="email"
                    />
                  </div>
                  <ErrorMessage
                    name={'email'}
                    className="pt-1 text-xs text-red-500"
                    data-cy="email-error"
                    component="div"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Phone
                  </label>
                  <div className="mt-1">
                    <Field
                      id="phone"
                      name="phone"
                      type="text"
                      autoComplete="phone"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      data-cy="phone"
                    />
                  </div>
                  <ErrorMessage
                    name={'phone'}
                    className="pt-1 text-xs text-red-500"
                    data-cy="phone-error"
                    component="div"
                  />
                </div>
                <div className="flex flex-wrap space-y-1 lg:flex-nowrap lg:space-x-2 lg:space-y-0">
                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="mt-1">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        data-cy="password"
                      />
                    </div>
                    <ErrorMessage
                      name={'password'}
                      className="pt-1 text-xs text-red-500"
                      data-cy="password-error"
                      component="div"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <Field
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="confirm-password"
                        required
                        data-cy="confirm-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <ErrorMessage
                      name={'confirm-password'}
                      className="pt-1 text-xs text-red-500"
                      data-cy="confirm-password-error"
                      component="div"
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    label={'Signup'}
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
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export { SignupForm };
