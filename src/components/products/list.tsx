import React from 'react';

import { type ProductsResponse } from '../../pages/products/types';
import { ProductItem } from './item';

const ProductsList = ({ products }: { products: ProductsResponse['data'] }): JSX.Element => {
  return (
    <>
      {products.map((product) => {
        const { id } = product;
        return (
          <div key={id} className="group relative p-4 sm:p-6">
            <ProductItem product={product} />
          </div>
        );
      })}
    </>
  );
};

export { ProductsList };
