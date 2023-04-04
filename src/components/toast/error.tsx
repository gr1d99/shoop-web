import { XCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';

const List = ({ title, errors }: { title: string; errors: string[] }): JSX.Element => {
  return (
    <div className="ml-3">
      <h3 className="text-sm font-medium text-red-800">{title}</h3>
      <div className="mt-2 text-sm text-red-700">
        <ul role="list" className="list-disc space-y-1 pl-3">
          {errors.map((error, index) => {
            const key = `${title}-${index}`;
            return <li key={key}>{error}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

const ErrorToast = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        {children}
      </div>
    </div>
  );
};

const ErrorListToast = ({ title, errors }: { title: string; errors: string[] }) => {
  return (
    <ErrorToast>
      <List title={title} errors={errors} />
    </ErrorToast>
  );
};

export { ErrorToast, ErrorListToast };
