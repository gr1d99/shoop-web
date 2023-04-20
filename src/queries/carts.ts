import { useQuery } from 'react-query';
import {
  type CartItemResources,
  type CartRequestParams,
  type CartResource,
  type CartResources
} from '../types';
import api from '../api';
import { queryKeys } from '../utils/query-keys';

const useFetchCarts = (params: CartRequestParams, options: { isEnabled: boolean }) => {
  return useQuery<CartRequestParams, any, CartResources, [string, CartRequestParams]>(
    queryKeys.cartKeys.all(params),
    async () => {
      return await api.getAll<CartRequestParams, CartResources>('/carts', params, {
        'X-AUTHENTICATE': true
      });
    },
    { enabled: options.isEnabled }
  );
};

const useFetchCart = (cartId: string | undefined, options: { isEnabled: boolean }) => {
  return useQuery<any, any, CartResource, [string, string | undefined]>(
    queryKeys.cartKeys.one(cartId),
    async () => {
      return await api.getOne<CartResource>(`/carts/${cartId}`, {}, { 'X-AUTHENTICATE': true });
    },
    { enabled: options.isEnabled }
  );
};

const useFetchCartItems = (cartId: string | undefined, options: { isEnabled: boolean }) => {
  return useQuery<object, any, CartItemResources, [string, string | undefined, object]>(
    queryKeys.cartKeys.items.all(cartId, {}),
    async () => {
      return await api.getAll(`/carts/${cartId}/cart_items`, {}, { 'X-AUTHENTICATE': true });
    },
    { enabled: options.isEnabled }
  );
};

export { useFetchCarts, useFetchCart, useFetchCartItems };
