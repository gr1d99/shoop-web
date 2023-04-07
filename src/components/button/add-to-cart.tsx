import React from 'react';
import { type AddToCartBtnProps } from './types';
import { PlusIcon } from '@heroicons/react/24/solid';

const AddToCartButton = (props: AddToCartBtnProps): JSX.Element => {
  const { label, ...rest } = props;
  return (
    <button
      className="group relative inline-flex w-full justify-center rounded-full  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  lg:justify-between"
      {...rest}>
      <PlusIcon className="h-5 w-5 text-white" aria-hidden="true" /> {label}
    </button>
  );
};

export { AddToCartButton };
