import { type ProductResource } from '../../types';
import { useAuth } from './use-auth';
import { useCurrentUser } from './use-current-user';
import { useCreateCartItem } from '../../mutations/cart-item';
import { useQueryClient } from 'react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { toasts } from '../../components/toast';

const { ErrorListToast } = toasts;

export interface AddToCart {
  handleAddToCart: (product: ProductResource['data'], quantity: number) => void;
}

const useAddToCart = (): AddToCart => {
  const queryClient = useQueryClient();
  const { authenticated } = useAuth();
  const { cart, user } = useCurrentUser();
  const { mutate } = useCreateCartItem();
  const handleAddToCart: AddToCart['handleAddToCart'] = (product, quantity = 1) => {
    if (authenticated) {
      const { attributes } = product;
      const { master } = attributes;
      const itemPayload: { amount: number; sku_id: number; product_id: number; quantity: number } =
        {
          amount: master.price,
          sku_id: master.sku_id,
          product_id: Number(product.id),
          quantity
        };

      if (cart !== null && user !== null) {
        const cartId = cart.id;

        mutate(
          { cart_id: cartId, ...itemPayload },
          {
            onSuccess: async ({ data }) => {
              await queryClient.invalidateQueries(['carts', data.attributes.cart_id]);
              const usersParams = { email: user.attributes.email };
              await queryClient.invalidateQueries(['users', usersParams]);
            },
            onError: (error) => {
              if (isAxiosError(error)) {
                const { response } = error;
                if (response?.data?.product_id !== undefined) {
                  toast.custom(
                    <ErrorListToast errors={['Item already exists in cart']} title="Add to Cart" />
                  );
                }
              } else {
                toast.custom(
                  <ErrorListToast
                    errors={[error?.message || JSON.stringify(error)]}
                    title="Add to Cart"
                  />
                );
              }
            }
          }
        );
      }
    } else {
      console.log('mot authenticated');
    }
  };

  return { handleAddToCart };
};

export { useAddToCart };
