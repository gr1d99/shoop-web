import { useLoaderData } from 'react-router-dom';
import { type CategoryProductsLoader } from '../../router/types';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/24/solid';
import { utils } from '../../utils';
import { AddToCartButton } from '../../components/button';
import React from 'react';

const ProductsPage = (): JSX.Element => {
  const payload = useLoaderData() as CategoryProductsLoader;
  const isError = axios.isAxiosError(payload);
  if (isError) {
    return <div>Not found</div>;
  }
  const { products } = payload;
  const { data: productsList } = products;
  return (
    <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
      {productsList.map((product) => {
        const { id, attributes } = product;
        const { name } = attributes;
        return (
          <div key={id} className="group relative p-4 sm:p-6">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
              <img
                src="https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg"
                alt={name}
                className="h-full w-full object-cover object-center"
              />
            </div>
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
                    Home Theater Vision aspect-square overflow-hidden rounded-lg bg-gray-200
                    group-hover:opacity-75
                  </a>
                </h3>
                <div className="flex flex-col items-start space-y-2">
                  <p className="sr-only">{3} out of 5 stars</p>
                  <div className="flex items-start">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={utils.classNames(
                          rating < 3 ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{10} reviews</p>
                  <div className="w-full md:hidden">
                    <AddToCartButton label={'Add'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
