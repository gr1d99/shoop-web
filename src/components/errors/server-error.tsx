import { Link } from 'react-router-dom';

const ServerError = () => {
  return (
    <>
      <p className="text-base font-semibold leading-8 text-indigo-600"></p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Server Error
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        Sorry, we our servers experienced an error, we are actively resolving this
      </p>
      <div className="mt-10">
        <Link to="/" className="text-sm font-semibold leading-7 text-indigo-600">
          <span aria-hidden="true">&larr;</span> Back to home
        </Link>
      </div>
    </>
  );
};

export { ServerError };
