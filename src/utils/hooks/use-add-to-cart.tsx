import { type ProductResource } from '../../types';
import { useAuth } from './use-auth';
import { useCurrentUser } from './use-current-user';
import { useCreateCartItem } from '../../mutations/cart';
import { useQueryClient } from 'react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { toasts } from '../../components/toast';
import { queryKeys } from '../query-keys';
import { useLocation, useNavigate } from 'react-router-dom';
import { utils } from '../index';

const { ErrorListToast } = toasts;

export type ModifyCartAction = 'increment' | 'decrement' | 'create';

export interface AddToCart {
  handleModifyCart: (
    product: ProductResource['data'],
    action: ModifyCartAction,
    quantity?: number
  ) => void;
}

const useAddToCart = (): AddToCart => {
  const queryClient = useQueryClient();
  const { authenticated } = useAuth();
  const { cart } = useCurrentUser();
  const { mutate } = useCreateCartItem();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (product: ProductResource['data'], quantity: number): void => {
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

      console.log({ cart });

      if (cart !== null) {
        const cartId = cart.id?.toString();

        mutate(
          { cart_id: cartId, ...itemPayload },
          {
            onSuccess: async ({ data }) => {
              const cartIdToStr = data.attributes.cart_id?.toString();
              await queryClient.invalidateQueries(queryKeys.cartKeys.one(cartIdToStr));
              await queryClient.invalidateQueries(queryKeys.cartKeys.items.all(cartIdToStr, {}));
            },
            onError: (error) => {
              if (isAxiosError(error)) {
                const { response } = error;
                if (response?.data?.product_id !== undefined) {
                  toast.custom(
                    <ErrorListToast errors={['Item already exists in cart']} title="Add to Cart" />
                  );
                } else {
                  try {
                    const errors: string[] = [];
                    Object.keys(response?.data).forEach((key) => {
                      errors.push(`${key} ${response?.data[key]}`);
                    });
                    toast.custom(<ErrorListToast errors={errors} title="Add to Cart" />);
                  } catch (e) {
                    toast.custom(
                      <ErrorListToast
                        errors={[error?.message || JSON.stringify(error)]}
                        title="Add to Cart"
                      />
                    );
                  }
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
      navigate(utils.routePaths.login, { state: { next: location.pathname } });
    }
  };

  const handleModifyCart: AddToCart['handleModifyCart'] = (product, action, quantity) => {
    if (action === 'create' && typeof quantity === 'number') {
      handleAddToCart(product, quantity);
    }
  };

  return { handleModifyCart };
};

export { useAddToCart };
