import { useQuery } from 'react-query';
import { type CartRequestParams, type CartResource, type CartResources } from '../types';
import api from '../api';

const useFetchCarts = (params: CartRequestParams, options: { isEnabled: boolean }) => {
  return useQuery<CartRequestParams, any, CartResources, [string, CartRequestParams]>(
    ['carts', params],
    async (context) => {
      const { queryKey } = context;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, requestParams] = queryKey;
      return await api.getAll<CartRequestParams, CartResources>('/carts', requestParams, {
        'X-AUTHENTICATE': true
      });
    },
    { enabled: options.isEnabled }
  );
};

const useFetchCart = (cartId: number | undefined, options: { isEnabled: boolean }) => {
  return useQuery<any, any, CartResource, [string, number | undefined]>(
    ['carts', cartId],
    async (context) => {
      const { queryKey } = context;
      const [key, id] = queryKey;
      return await api.getOne<CartResource>(`/${key}/${id}`, {}, { 'X-AUTHENTICATE': true });
    },
    { enabled: options.isEnabled }
  );
};

export { useFetchCarts, useFetchCart };
