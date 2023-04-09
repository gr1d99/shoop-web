import { StarIcon } from '@heroicons/react/24/solid';
import { utils } from '../../utils';
import React from 'react';

const ProductRatings = () => {
  const rating = 3;
  return (
    <div>
      <p className="sr-only">{rating} out of 5 stars</p>
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((rating) => (
          <StarIcon
            key={rating}
            className={utils.classNames(
              rating < 3 ? 'text-yellow-400' : 'text-gray-200',
              'h-4 w-4 flex-shrink-0 text-sm'
            )}
            aria-hidden="true"
          />
        ))}{' '}
        <span className="text-sm antialiased">({rating})</span>
      </div>
    </div>
  );
};

export { ProductRatings };
