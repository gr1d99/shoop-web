import { type CartItemResources } from '../types';

const productInCart = (items: CartItemResources | null, productId: number | string) => {
  if (items === null) {
    return false;
  }

  const item = items.data.find(
    (item) => item.attributes.product_id?.toString() === productId?.toString()
  );

  return !(item == null);
};

export const cart = {
  productInCart
};
