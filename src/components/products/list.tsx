import React from 'react';

import { ProductItem } from './item';
import { type AddToCart } from '../../utils/hooks/use-add-to-cart';
import { type ProductsResources } from '../../types';

const ProductsList = ({
  products,
  handleAddToCart
}: {
  products: ProductsResources['data'];
  handleAddToCart: AddToCart['handleAddToCart'];
}): JSX.Element => {
  return (
    <>
      {products.map((product) => {
        const { id } = product;
        return (
          <div key={id} className="group relative p-4 sm:p-6" data-cy="product-item">
            <ProductItem product={product} handleAddToCart={handleAddToCart} />
          </div>
        );
      })}
    </>
  );
};

export { ProductsList };
