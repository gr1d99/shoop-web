import { AddToCartButton } from '../button';
import React from 'react';
import { type ResourcesData } from '../../types';
import { type Product } from '../../pages/products/types';
import { ProductImage } from './image';
import { ProductReview } from './review';

const ProductItem = ({
  product
}: {
  product: ResourcesData<Omit<Product, 'id'>, []>;
}): JSX.Element => {
  const { attributes } = product;
  const { name, images } = attributes;
  const [image] = images;
  return (
    <>
      <ProductImage image={image} />
      <div className="mt-3 flex w-full flex-col items-start space-y-2">
        <div className="flex w-full items-center justify-between p-2">
          <div className="">
            <p className="text-base font-bold text-gray-900">KSH 100</p>
          </div>
          <div className="hidden md:block">
            <AddToCartButton label={'Add'} />
          </div>
        </div>
        <div className="">
          <h3 className="text-sm font-medium text-gray-900">
            <a href={''}>
              <span aria-hidden="true" className="absolute" />
              {name}
            </a>
          </h3>
          <div className="flex flex-col items-start space-y-2">
            <ProductReview />
            <div className="w-full md:hidden">
              <AddToCartButton label={'Add'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductItem };
