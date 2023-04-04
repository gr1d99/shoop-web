import { CheckCircleIcon } from '@heroicons/react/20/solid';

const SuccessToast = ({ title, message }: { title: string; message: string }) => {
  return (
    <div className="rounded-md bg-green-50 p-4" data-cy="toast">
      <div className="flex">
        <div className="shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">{title}</h3>
          <div className="mt-2 text-sm text-green-700">
            <p data-cy="toast-success-message">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SuccessToast };
