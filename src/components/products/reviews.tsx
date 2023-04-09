import React from 'react';

const ProductReviews = ({ underline }: { underline: boolean }): JSX.Element => {
  return (
    <>
      <p className={`text-sm text-gray-500 ${underline ? 'underline' : ''}`}>{10} reviews</p>
    </>
  );
};

ProductReviews.defaultProps = {
  underline: false
};

export { ProductReviews };
