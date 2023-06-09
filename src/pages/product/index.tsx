import { useLoaderData } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { ProductRatings } from '../../components/products/ratings';
import { ProductReviews } from '../../components/products/reviews';
import React from 'react';
import { ProductItem } from '../../components/products/item';
import { ProductTitle } from './components/title';
import { ProductBrand } from './components/brand';
import { ProductPrice } from './components/price';
import { ProductTags } from './components/tags';
import { ProductMeta } from './components/meta';
import { AddToCartButton } from '../../components/button';
import { isAxiosError } from 'axios';
import type { AxiosError } from 'axios';
import { withErrorBoundary } from '../../components/errors';
import { utils } from '../../utils';
import { type CartItemResources, type ProductResource } from '../../types';
import { useCurrentUser } from '../../utils/hooks/use-current-user';
import { type ProductCartItemMap } from '../../utils/cart';
import { type ModifyCartAction, useAddToCart } from '../../utils/hooks/use-add-to-cart';

const ProductPage = (): JSX.Element => {
  const product = useLoaderData() as ProductResource['data'] | AxiosError;
  const { cartItems } = useCurrentUser();
  const { handleModifyCart } = useAddToCart();
  if (isAxiosError(product)) {
    return utils.errors.resolveResourceError(product);
  }
  const products = Array.from([
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product
  ]);
  const { attributes, id } = product;
  const { name, images, description, master } = attributes;
  const inCart = utils.cart.productInCart(cartItems, id);
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
    <div className="relative">
      <div className="grid gap-y-4 lg:grid-flow-col lg:grid-cols-3 lg:gap-x-2 lg:pt-8">
        <div className="grid lg:hidden">
          <ProductBrand brand={'Food'} />
          <ProductTitle title={name} />
          <div className="flex justify-between">
            <ProductPrice size="sm" price={Number(master.price)} />
            <div className="flex flex-col items-end space-x-2">
              <ProductRatings />
              <ProductReviews underline />
            </div>
          </div>
        </div>
        <Tab.Group as="div" className="grid gap-y-2 lg:hidden">
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
          <AddToCartButton
            label={'Add to Cart'}
            inCart={inCart}
            item={cartItem}
            target={'desktop'}
            itemIndex={0}
            onClick={handleOnAddClick}
          />
        </div>
        <div className="mt-2 grid w-full lg:hidden">
          <h2 className="font-bold antialiased"> Similar Items</h2>
          <div className="grid">
            <div className="flex w-full space-x-3 overflow-x-scroll scroll-smooth">
              {products.map((product, index) => {
                return (
                  <div key={`${product.id}-desktop}`} className="w-1/3 py-4">
                    <ProductItem
                      product={product}
                      itemIndex={index}
                      cartItems={cartItems}
                      handleModifyCart={handleModifyCart}
                    />
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

        {/* Desktop */}
        <Tab.Group as="div" className="hidden lg:col-span-2 lg:grid lg:grid-cols-4 lg:gap-x-2">
          <Tab.List className="w-full">
            {images.map((image) => {
              const { id, url, name, alt } = image;
              return (
                <Tab key={id}>
                  <img
                    src={url}
                    alt={alt === '' ? name : alt}
                    title={name}
                    className="w-full rounded object-cover object-center"
                  />
                </Tab>
              );
            })}
          </Tab.List>
          <Tab.Panels className="col-span-3">
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
        </Tab.Group>
        <div className="hidden lg:flex lg:flex-col lg:space-y-6">
          {/* Purchases */}
          <div className="rounded border p-2">
            <p className="text-sm font-bold antialiased">100+ bought since yesterday</p>
          </div>

          {/* Product Details */}
          <div className="hidden lg:flex lg:flex-col lg:space-y-2 lg:rounded lg:p-2 lg:shadow-md">
            {/* Tags */}
            <ProductTags tags={[]} />

            {/* Brand */}
            <div>
              <ProductBrand brand={'Food'} />
            </div>

            {/* Title */}
            <ProductTitle title={name} />

            {/* Ratings */}
            <div className="flex space-x-2">
              <ProductRatings />
              <ProductReviews underline />
            </div>

            {/* Pricing */}
            <div className="py-2">
              <ProductPrice size={'lg'} price={Number(master.price)} />
            </div>

            {/* Add to Cart */}
            <div className="w-fit">
              <AddToCartButton
                label={'Add to Cart'}
                inCart={inCart}
                item={cartItem}
                target="mobile"
                itemIndex={0}
                onClick={handleOnAddClick}
              />
            </div>
            <div className="p-2">
              <div className="border-b border-gray-300" />
            </div>
            {/* Meta info */}
            <div className="flex flex-col">
              <ProductMeta />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:pt-6">
        <h2 className="py-2 font-bold antialiased"> Similar Items</h2>
        <div className="grid grid-cols-5 gap-x-4 gap-y-8 divide-gray-500">
          {products.map((product, index) => {
            return (
              <ProductItem
                key={`${product.id}-mobile`}
                product={product}
                handleModifyCart={handleModifyCart}
                cartItems={cartItems}
                itemIndex={index}
              />
            );
          })}
        </div>
      </div>
      <div className="lg:pt-6">
        <div>
          <h2 className="font-bold antialiased">Description</h2>
          <div>
            <p className="text-sm antialiased">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(ProductPage);
