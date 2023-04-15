import { useLoaderData } from 'react-router-dom';
import { type CategoryProductsLoader } from '../../router/types';
import axios from 'axios';
import React from 'react';
import { ProductsList } from '../../components/products';
import { useAddToCart } from '../../utils/hooks/use-add-to-cart';
import { useCurrentUser } from '../../utils/hooks/use-current-user';

const ProductsPage = (): JSX.Element => {
  const payload = useLoaderData() as CategoryProductsLoader;
  const { handleAddToCart } = useAddToCart();
  const { cartItems } = useCurrentUser();
  const isError = axios.isAxiosError(payload);
  if (isError) {
    return <div>Not found</div>;
  }
  const { products } = payload;
  const { data: productsList } = products;
  return (
    <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
      <ProductsList
        products={productsList}
        handleAddToCart={handleAddToCart}
        cartItems={cartItems}
      />
    </div>
  );
};

export default ProductsPage;
