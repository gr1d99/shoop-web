import { AddToCartButton } from '../button';
import React from 'react';
import { type CartItemResources, type ProductResource } from '../../types';
import { ProductImage } from './image';
import { ProductRatings } from './ratings';
import { Link } from 'react-router-dom';
import { ProductReviews } from './reviews';
import { type AddToCart } from '../../utils/hooks/use-add-to-cart';
import { utils } from '../../utils';

const ProductItem = ({
  product,
  handleAddToCart,
  cartItems,
  itemIndex
}: {
  product: ProductResource['data'];
  handleAddToCart: AddToCart['handleAddToCart'];
  cartItems: CartItemResources | null;
  itemIndex: number;
}): JSX.Element => {
  const { attributes, id } = product;
  const { name, images, slug }: ProductResource['data']['attributes'] = attributes;
  const [image] = images;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const url = `/product/${slug}`;
  const itemInCart = utils.cart.productInCart(cartItems, id);

  const onAddToCart = (): void => {
    handleAddToCart(product, 1);
  };
  return (
    <div>
      <ProductImage slug={slug} image={image} />
      <div className="mt-3 flex w-full flex-col items-start space-y-2">
        <div className="flex w-full items-center justify-between">
          <div className="">
            <p className="text-sm font-bold text-gray-900" data-cy="product-price">
              KSH 100
            </p>
          </div>
          <div className="hidden md:block">
            <AddToCartButton
              label={'Add'}
              onClick={onAddToCart}
              {...{ inCart: itemInCart }}
              inCart={itemInCart}
              itemIndex={itemIndex}
              target={'desktop'}
            />
          </div>
        </div>
        <div className="">
          <h3 className="text-sm font-medium text-gray-900">
            <Link to={url} data-cy="product-name">
              <span aria-hidden="true" className="absolute" />
              {name}
            </Link>
          </h3>
          <div className="flex flex-col items-start space-y-2">
            <ProductRatings />
            <ProductReviews />
            <div className="w-full md:hidden">
              <AddToCartButton
                label={'Add'}
                data-cy="add-to-cart-btn"
                onClick={onAddToCart}
                inCart={itemInCart}
                itemIndex={itemIndex}
                target={'mobile'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductItem };
