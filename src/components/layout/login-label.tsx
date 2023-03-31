import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import React from 'react';

const LoginLabel = () => {
  return (
    <div className="inline-flex space-x-1 items-center">
      <ArrowRightOnRectangleIcon className="leading-6 text-gray-900 h-4 w-4" />
      <span className="text-sm font-semibold leading-6 text-gray-900">Login</span>
    </div>
  );
};

export { LoginLabel };
