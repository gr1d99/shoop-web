import { useMutation } from 'react-query';
import api from '../api';
import { type CartItemResource } from '../types';

const useCreateCartItem = () => {
  return useMutation<
    CartItemResource,
    any,
    {
      cart_id: string;
      amount: number;
      product_id: number;
      sku_id: number;
      quantity: number;
    }
  >({
    mutationFn: async (params) => {
      const { cart_id: cartId, ...rest } = params;
      return await api.post(`/carts/${cartId}/cart_items`, rest, { 'X-AUTHENTICATE': true });
    }
  });
};

const useUpdateCartItem = () => {
  return useMutation<
    CartItemResource,
    any,
    { cartId: string; cartItemId: string; amount?: number; quantity?: number }
  >({
    mutationFn: async (params) => {
      const { cartId, cartItemId, ...rest } = params;
      return await api.update(`/carts/${cartId}/cart_items/${cartItemId}`, rest, {
        'X-AUTHENTICATE': true
      });
    }
  });
};

const useDeleteCartItem = () => {
  return useMutation<null, any, { cartId: string; cartItemId: string }>({
    mutationFn: async (params) => {
      return await api.delete(
        `/carts/${params.cartId}/cart_items/${params.cartItemId}`,
        {},
        { 'X-AUTHENTICATE': true }
      );
    }
  });
};

export { useCreateCartItem, useUpdateCartItem, useDeleteCartItem };
