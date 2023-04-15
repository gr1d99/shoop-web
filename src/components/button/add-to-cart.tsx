import React from 'react';
import { type AddToCartBtnProps } from './types';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

const AddToCartButton = (props: AddToCartBtnProps): JSX.Element => {
  const { label, inCart, itemIndex, target, ...rest } = props;
  return (
    <div className="group relative flex h-full flex-nowrap items-center rounded-full bg-indigo-600 font-normal antialiased">
      <button
        className={`${
          inCart ? 'inline-flex' : 'hidden'
        } h-full w-full justify-center rounded-full  bg-indigo-600 px-2 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:justify-between`}
        {...rest}>
        <MinusIcon className="h-5 w-5 text-white" aria-hidden="true" />
      </button>
      <div
        className={`${
          inCart ? 'inline-flex' : 'hidden'
        } rounded-full bg-indigo-600 px-2 text-white`}>
        <span className="w-full">1</span>
      </div>
      <button
        className={`inline-flex w-full justify-center rounded-full bg-indigo-600 ${
          inCart ? 'px-2' : 'px-3'
        } py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:justify-between`}
        {...rest}
        data-cy={
          inCart
            ? `increment-qty-btn-${itemIndex}-${target}`
            : `add-to-cart-btn-${itemIndex}-${target}`
        }>
        <PlusIcon className="h-5 w-5 text-white" aria-hidden="true" /> {!inCart ? label : null}
      </button>
    </div>
  );
};

export { AddToCartButton };
