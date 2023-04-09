import { AddToCartButton } from '../button';
import React from 'react';
import { type ResourcesData } from '../../types';
import { type Product } from '../../pages/products/types';
import { ProductImage } from './image';
import { ProductReview } from './review';
import { Link } from 'react-router-dom';

const ProductItem = ({
  product
}: {
  product: ResourcesData<Omit<Product, 'id'>, []>;
}): JSX.Element => {
  const { attributes } = product;
  const { name, images, slug } = attributes;
  const [image] = images;
  return (
    <>
      <ProductImage slug={slug} image={image} />
      <div className="mt-3 flex w-full flex-col items-start space-y-2">
        <div className="flex w-full items-center justify-between">
          <div className="">
            <p className="text-base font-bold text-gray-900" data-cy="product-price">
              KSH 100
            </p>
          </div>
          <div className="hidden md:block">
            <AddToCartButton label={'Add'} />
          </div>
        </div>
        <div className="">
          <h3 className="text-sm font-medium text-gray-900">
            <Link to={`/product/${slug}`} data-cy="product-name">
              <span aria-hidden="true" className="absolute" />
              {name}
            </Link>
          </h3>
          <div className="flex flex-col items-start space-y-2">
            <ProductReview />
            <div className="w-full md:hidden">
              <AddToCartButton label={'Add'} data-cy="add-to-cart-btn" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductItem };
