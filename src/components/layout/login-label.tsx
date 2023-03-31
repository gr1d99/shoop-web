import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import React from 'react';

const LoginLabel = () => {
  return (
    <a className="inline-flex space-x-1 items-center" href="/login">
      <ArrowRightOnRectangleIcon className="leading-6 text-gray-900 h-4 w-4" />
      <span className="text-sm font-semibold leading-6 text-gray-900">Login</span>
    </a>
  );
};

export { LoginLabel };
