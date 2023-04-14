import { AddToCartButton } from '../button';
import React from 'react';
import { type ProductResource } from '../../types';
import { ProductImage } from './image';
import { ProductRatings } from './ratings';
import { Link } from 'react-router-dom';
import { ProductReviews } from './reviews';
import { type AddToCart } from '../../utils/hooks/use-add-to-cart';

// const p: ProductResource = {
//   data: {
//     id: '2',
//     type: 'p',
//     attributes: {
//       slug: '2',
//       name: 'a',
//       description: 'a',
//       brand_id: 1,
//       category_id: 2,
//       meta: [],
//       images: []
//     },
//     relationships: []
//   }
// };
const ProductItem = ({
  product,
  handleAddToCart
}: {
  product: ProductResource['data'];
  handleAddToCart: AddToCart['handleAddToCart'];
}): JSX.Element => {
  const { attributes } = product;
  const { name, images, slug }: ProductResource['data']['attributes'] = attributes;
  const [image] = images;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const url = `/product/${slug}`;

  const onAddToCart = (): void => {
    handleAddToCart(product);
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
            <AddToCartButton label={'Add'} onClick={onAddToCart} />
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
              <AddToCartButton label={'Add'} data-cy="add-to-cart-btn" onClick={onAddToCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductItem };
