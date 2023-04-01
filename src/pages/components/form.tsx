import Button from '../../components/button';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { type LoginFormProps } from './types';

const LoginForm = (props: LoginFormProps): JSX.Element => {
  const { handleSubmit } = props;
  return (
    <div className="min-h-full sm:px-6 lg:px-2 pb-2">
      <div className="flex flex-col space-y-2 w-full max-w-md">
        <div>
          <h2
            className="text-center text-2xl font-bold tracking-tight text-gray-900"
            data-cy="header">
            Sign in to your account
          </h2>
        </div>
        <form
          className="w-full flex flex-col space-y-5"
          onSubmit={handleSubmit}
          data-cy="login-form"
          method="post"
          action="/">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                data-cy="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
                data-cy="password"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <input
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
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              label={'Sign in'}
              loading={false}
              data-cy="submit"
              icon={
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export { LoginForm };
