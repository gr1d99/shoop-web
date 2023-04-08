import { StarIcon } from '@heroicons/react/24/solid';
import { utils } from '../../utils';
import React from 'react';

const ProductReview = () => {
  return (
    <>
      <p className="sr-only">{3} out of 5 stars</p>
      <div className="flex items-start">
        {[0, 1, 2, 3, 4].map((rating) => (
          <StarIcon
            key={rating}
            className={utils.classNames(
              rating < 3 ? 'text-yellow-400' : 'text-gray-200',
              'h-5 w-5 flex-shrink-0'
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-1 text-sm text-gray-500">{10} reviews</p>
    </>
  );
};

export { ProductReview };
