import { AddToCartButton } from '../button';
import React from 'react';
import { type CartItemResources, type ProductResource } from '../../types';
import { ProductImage } from './image';
import { ProductRatings } from './ratings';
import { Link } from 'react-router-dom';
import { ProductReviews } from './reviews';
import { type AddToCart, type ModifyCartAction } from '../../utils/hooks/use-add-to-cart';
import { utils } from '../../utils';
import { type ProductCartItemMap } from '../../utils/cart';

const ProductItem = ({
  product,
  cartItems,
  itemIndex,
  handleModifyCart
}: {
  product: ProductResource['data'];
  handleModifyCart: AddToCart['handleModifyCart'];
  cartItems: CartItemResources | null;
  itemIndex: number;
}): JSX.Element => {
  const { attributes, id } = product;
  const { name, images, slug, master }: ProductResource['data']['attributes'] = attributes;
  const [image] = images;
  const url = `/product/${slug}`;
  const itemInCart = utils.cart.productInCart(cartItems, id);
  const cartItemsMapping = utils.cart.cartItemMapping(cartItems as CartItemResources);
  const cartItem = utils.cart.productItemMapping(
    cartItemsMapping === undefined ? {} : cartItemsMapping
  )?.[product.id as keyof ProductCartItemMap];

  const handleOnAddClick = (event: React.SyntheticEvent<HTMLButtonElement | SVGSVGElement>) => {
    const isButtonEl = event.target instanceof HTMLButtonElement;
    const isSvgEl = event.target instanceof SVGElement;
    if (!isButtonEl && !isSvgEl) {
      return;
    }

    const action = event.currentTarget.dataset?.action as ModifyCartAction;

    handleModifyCart(product, action, 1);
  };
  return (
    <div>
      <ProductImage slug={slug} image={image} />
      <div className="mt-3 flex w-full flex-col items-start space-y-2">
        <div className="flex w-full items-center justify-between">
          <div className="">
            <p className="text-sm font-bold text-gray-900" data-cy="product-price">
              {utils.locales.toCurrency(Number(master.price))}
            </p>
          </div>
          <div className="hidden md:block">
            <AddToCartButton
              label={'Add'}
              onClick={handleOnAddClick}
              {...{ inCart: itemInCart }}
              inCart={itemInCart}
              itemIndex={itemIndex}
              target={'desktop'}
              item={cartItem}
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
                onClick={handleOnAddClick}
                inCart={itemInCart}
                itemIndex={itemIndex}
                target={'mobile'}
                item={cartItem}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductItem };
