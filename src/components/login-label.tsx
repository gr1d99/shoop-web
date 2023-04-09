import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import React from 'react';

const LoginLabel = ({
  setSidebarOpen,
  target
}: {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  target: 'mobile' | 'desktop';
}): JSX.Element => {
  const onClick = () => {
    setSidebarOpen(false);
  };
  return (
    <a
      className="inline-flex items-center space-x-1"
      href="/login"
      data-cy={`login-link-${target}`}
      onClick={onClick}>
      <ArrowRightOnRectangleIcon className="h-4 w-4 leading-6 text-gray-900" />
      <span className="text-sm font-semibold leading-6 text-gray-900">Login</span>
    </a>
  );
};

LoginLabel.defaultProps = {
  target: 'desktop'
};

export { LoginLabel };
