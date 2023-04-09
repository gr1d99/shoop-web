import { useLoaderData } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { type ProductResponse } from '../products/types';
import { ProductRatings } from '../../components/products/ratings';
import { ProductReviews } from '../../components/products/reviews';
// import { AddToCartButton } from '../../components/button';
import React from 'react';
import { ProductItem } from '../../components/products/item';
import { ProductTitle } from './components/title';
import { ProductBrand } from './components/brand';
import { ProductPrice } from './components/price';
// import { ProductTags } from './components/tags';
import { ProductMeta } from './components/meta';
import { AddToCartButton } from '../../components/button';

const ProductPage = (): JSX.Element => {
  const product = useLoaderData() as ProductResponse['data'] | undefined;

  if (product == null) {
    return <>Product Not Found</>;
  }
  const products = Array.from([product, product, product, product, product]);
  const { attributes } = product;
  const { name, images, description } = attributes;
  return (
    <div className="relative">
      <div className="grid gap-y-4 lg:grid-flow-col">
        <div className="grid lg:hidden">
          <ProductBrand brand={'Food'} />
          <ProductTitle title={name} />
          <div className="flex justify-between">
            <ProductPrice size="sm" />
            <div className="flex flex-col items-end space-x-2">
              <ProductRatings />
              <ProductReviews underline />
            </div>
          </div>
        </div>
        <Tab.Group as="div" className="grid gap-y-2">
          <Tab.Panels className="">
            {images.map((image) => {
              const { id, name, alt, url } = image;
              return (
                <Tab.Panel key={id} className="grid justify-items-stretch">
                  <img
                    src={url}
                    alt={alt === '' ? name : alt}
                    title={name}
                    className="h-full w-full rounded object-cover object-center"
                  />
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
          <Tab.List className="flex overflow-scroll">
            {images.map((image) => {
              const { id, url, name, alt } = image;
              return (
                <Tab key={id} className="">
                  <img
                    src={url}
                    alt={alt === '' ? name : alt}
                    title={name}
                    className="h-20 w-20 rounded object-cover object-center"
                  />
                </Tab>
              );
            })}
          </Tab.List>
        </Tab.Group>
        <div className="grid lg:hidden">
          <AddToCartButton label={'Add to Cart'} />
        </div>
        <div className="mt-2 grid lg:hidden">
          <h2 className="font-bold antialiased"> Similar Items</h2>
          <div className="grid">
            <div className="flex space-x-2 overflow-x-scroll scroll-smooth">
              {products.map((product) => {
                return (
                  <div key={product.id} className="grid py-4">
                    <ProductItem product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="grid lg:hidden">
          <h2 className="font-bold antialiased">Description</h2>
          <div>
            <p className="text-sm antialiased">{description}</p>
          </div>
        </div>
        <div className="grid lg:hidden">
          <ProductMeta />
        </div>
      </div>
      {/*    <div className="flex flex-col space-y-6"> */}
      {/*      /!* Purchases *!/ */}
      {/*      <div className="rounded border p-2"> */}
      {/*        <p className="text-sm font-bold antialiased">100+ bought since yesterday</p> */}
      {/*      </div> */}

      {/*      /!* Product Details *!/ */}
      {/*      <div className="flex flex-col space-y-2 rounded p-2 shadow-md"> */}
      {/*        /!* Tags *!/ */}
      {/*        <ProductTags tags={[]} /> */}

      {/*        /!* Brand *!/ */}
      {/*        <div> */}
      {/*          <ProductBrand brand={'Food'} /> */}
      {/*        </div> */}

      {/*        /!* Title *!/ */}
      {/*        <ProductTitle title={name} /> */}

      {/*        /!* Ratings *!/ */}
      {/*        <div className="flex space-x-2"> */}
      {/*          <ProductRatings /> */}
      {/*          <ProductReviews underline /> */}
      {/*        </div> */}

      {/*        /!* Pricing *!/ */}
      {/*        <div className="flex items-center space-x-4 py-2"> */}
      {/*          <h2 className="text-lg font-extrabold antialiased">Now Ksh 100</h2> */}
      {/*          <small className="text-gray-500 line-through">Ksh 99</small> */}
      {/*        </div> */}

      {/*        /!* Add to Cart *!/ */}
      {/*        <div className="w-fit"> */}
      {/*          <AddToCartButton label={'Add to Cart'} /> */}
      {/*        </div> */}
      {/*        <div className="p-2"> */}
      {/*          <div className="border-b border-gray-300" /> */}
      {/*        </div> */}
      {/*        /!* Meta info *!/ */}
      {/*        <div className="flex flex-col"> */}
      {/*          <ProductMeta /> */}
      {/*        </div> */}
      {/*      </div> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </div> */}
    </div>
  );
};

export default ProductPage;
