import { type ProductRequestParams } from '../../../types';
import api from '../../../api';
import { type ProductsResponse } from '../types';

const fetchProducts = async (params: ProductRequestParams) => {
  return await api.getAll<ProductRequestParams, ProductsResponse>('/products', params);
};

export { fetchProducts };
