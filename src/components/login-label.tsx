import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import React from 'react';

const LoginLabel = ({
  hideSidebar,
  target
}: {
  hideSidebar: () => void;
  target: 'mobile' | 'desktop';
}): JSX.Element => {
  return (
    <a
      className="inline-flex items-center space-x-1"
      href="/login"
      data-cy={`login-link-${target}`}
      onClick={hideSidebar}>
      <ArrowRightOnRectangleIcon className="h-4 w-4 leading-6 text-gray-900" />
      <span className="text-sm font-semibold leading-6 text-gray-900">Login</span>
    </a>
  );
};

LoginLabel.defaultProps = {
  target: 'desktop'
};

export { LoginLabel };
