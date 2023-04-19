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

export { useCreateCartItem };
