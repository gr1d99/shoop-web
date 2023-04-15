import { type RequestParams } from '../../types';

const cartKeys = {
  all: <P extends RequestParams>(params: P): [string, P] => {
    return ['carts', params];
  },
  one: (cartId: string | undefined): [string, string | undefined] => ['carts', cartId],
  items: {
    all: <P = object>(cartId: string | undefined, params: P): [string, string | undefined, P] => {
      return ['cart-items', cartId, params];
    }
  }
};

export { cartKeys };
