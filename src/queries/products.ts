import { type ProductRequestParams, type ProductsResources } from '../types';
import api from '../api';

const fetchProducts = async (params: ProductRequestParams) => {
  return await api.getAll<ProductRequestParams, ProductsResources>('/products', params);
};

export { fetchProducts };
