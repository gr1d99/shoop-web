import { type CartItemResource, type CartItemResources, type ProductResource } from '../../types';
import { useAuth } from './use-auth';
import { useCurrentUser } from './use-current-user';
import { useCreateCartItem, useDeleteCartItem } from '../../mutations/cart';
import { useQueryClient } from 'react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { toasts } from '../../components/toast';
import { queryKeys } from '../query-keys';
import { useLocation, useNavigate } from 'react-router-dom';
import { utils } from '../index';
import { type ProductCartItemMap } from '../cart';

const { ErrorListToast, SuccessToast } = toasts;

export type ModifyCartAction = 'increment' | 'decrement' | 'create' | 'delete';

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
  const { cart, cartItems } = useCurrentUser();
  const { mutate: createCartItem } = useCreateCartItem();
  const { mutate: deleteCartItem } = useDeleteCartItem();
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

      if (cart !== null) {
        const cartId = cart.id?.toString();

        createCartItem(
          { cart_id: cartId, ...itemPayload },
          {
            onSuccess: async ({ data }) => {
              const cartIdToStr = data.attributes.cart_id?.toString();
              await queryClient.invalidateQueries(queryKeys.cartKeys.one(cartIdToStr));
              await queryClient.invalidateQueries(queryKeys.cartKeys.items.all(cartIdToStr, {}));
              toast.custom(<SuccessToast message={'Item added to cart'} title="" />);
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
  const handleDeleteCartItem = (item: CartItemResource['data']) => {
    if (authenticated) {
      deleteCartItem(
        {
          cartId: item.attributes.cart_id.toString(),
          cartItemId: item.id.toString()
        },
        {
          onSuccess: async () => {
            const cartIdToStr = item.attributes.cart_id?.toString();
            await queryClient.invalidateQueries(queryKeys.cartKeys.one(cartIdToStr));
            await queryClient.invalidateQueries(queryKeys.cartKeys.items.all(cartIdToStr, {}));
            toast.custom(<SuccessToast message={'Item removed from cart'} title="" />);
          },
          onError: (error: any) => {
            if (isAxiosError(error)) {
              const { response } = error;
              const errors: string[] = [];
              Object.keys(response?.data).forEach((key) => {
                errors.push(`${key} ${response?.data[key]}`);
              });
              toast.custom(
                <ErrorListToast
                  errors={errors ?? [response?.data?.message ?? 'Something went wrong']}
                  title="Remove from Cart"
                />
              );
            } else {
              toast.custom(
                <ErrorListToast errors={['Something went wrong']} title="Remove from Cart" />
              );
            }
          }
        }
      );
    } else {
      console.log('aaaaaa');
    }
  };

  const handleModifyCart: AddToCart['handleModifyCart'] = (product, action, quantity) => {
    if (action === 'create' && typeof quantity === 'number') {
      handleAddToCart(product, quantity);
    }

    if (action === 'delete') {
      const cartItemsMapping = utils.cart.cartItemMapping(cartItems as CartItemResources);
      const cartItem = utils.cart.productItemMapping(
        cartItemsMapping === undefined ? {} : cartItemsMapping
      )?.[product.id as keyof ProductCartItemMap];
      handleDeleteCartItem(cartItem);
    }
  };

  return { handleModifyCart };
};

export { useAddToCart };
