import React from 'react';

import { ProductItem } from './item';
import { type AddToCart } from '../../utils/hooks/use-add-to-cart';
import { type CartItemResources, type ProductsResources } from '../../types';

const ProductsList = ({
  products,
  cartItems,
  handleModifyCart
}: {
  products: ProductsResources['data'];
  cartItems: CartItemResources | null;
  handleModifyCart: AddToCart['handleModifyCart'];
}): JSX.Element => {
  return (
    <>
      {products.map((product, index) => {
        const { id } = product;
        return (
          <div key={id} className="group relative p-4 sm:p-6" data-cy={`product-item-${index}`}>
            <ProductItem
              product={product}
              cartItems={cartItems}
              itemIndex={index}
              handleModifyCart={handleModifyCart}
            />
          </div>
        );
      })}
    </>
  );
};

export { ProductsList };
