import React from 'react';

const ProductBrand = ({ brand }: { brand: string }) => {
  return (
    <div>
      <p className="text-sm underline">{brand}</p>
    </div>
  );
};

export { ProductBrand };
