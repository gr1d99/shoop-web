import { type CartItemResource, type CartItemResources } from '../types';
import { utils } from './index';

type CartItemMap = Record<CartItemResource['data']['id'], CartItemResource['data']>;

export type ProductCartItemMap = Record<
  CartItemResource['data']['attributes']['product_id'],
  CartItemResource['data']
>;

const cartItemMapping = (items: CartItemResources): CartItemMap => {
  return items?.data?.reduce<CartItemMap>((acc, item) => {
    return { ...acc, [item.id]: item };
  }, {});
};

const productItemMapping = (cartItemMappings: CartItemMap): ProductCartItemMap => {
  return Object?.keys(cartItemMappings)?.reduce<ProductCartItemMap>((acc, key) => {
    const item = cartItemMappings[key];

    return { ...acc, [item.attributes.product_id]: item };
  }, {});
};

const productInCart = (items: CartItemResources | null, productId: number | string) => {
  if (utils.isNullableOrUndefined<CartItemResources | null>(items)) {
    return false;
  }

  const itemsMapping = cartItemMapping(items as CartItemResources);
  const productItemsMapping = productItemMapping(itemsMapping);

  return Boolean(productItemsMapping?.[productId as keyof ProductCartItemMap]);
};

export const cart = {
  productInCart,
  cartItemMapping,
  productItemMapping
};
