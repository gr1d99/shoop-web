import { type ProductResource } from '../../types';
import { useAuth } from './use-auth';
import { useCurrentUser } from './use-current-user';
import { useCreateCartItem } from '../../mutations/cart-item';
import { useQueryClient } from 'react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { toasts } from '../../components/toast';
import { queryKeys } from '../query-keys';
import { useLocation, useNavigate } from 'react-router-dom';
import { utils } from '../index';

const { ErrorListToast } = toasts;

export interface AddToCart {
  handleAddToCart: (product: ProductResource['data'], quantity: number) => void;
}

const useAddToCart = (): AddToCart => {
  const queryClient = useQueryClient();
  const { authenticated } = useAuth();
  const { cart, user } = useCurrentUser();
  const { mutate } = useCreateCartItem();
  const navigate = useNavigate();
  const location = useLocation();

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

  return { handleAddToCart };
};

export { useAddToCart };
