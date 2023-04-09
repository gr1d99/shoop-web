import { useLoaderData } from 'react-router-dom';
import { type CategoryProductsLoader } from '../../router/types';
import axios from 'axios';
import React from 'react';
import { ProductsList } from '../../components/products';

const ProductsPage = (): JSX.Element => {
  const payload = useLoaderData() as CategoryProductsLoader;
  const isError = axios.isAxiosError(payload);
  if (isError) {
    return <div>Not found</div>;
  }
  const { products } = payload;
  const { data: productsList } = products;
  return (
    <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
      <ProductsList products={productsList} />
    </div>
  );
};

export default ProductsPage;