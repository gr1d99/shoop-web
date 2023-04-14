import api from '../api';
import { type RequestParams } from '../types';
import { type CategoriesResponse } from '../pages/home/types';

const fetchCategories = async (params: RequestParams) => {
  return await api.getAll<RequestParams, CategoriesResponse>('/categories', params);
};

export { fetchCategories };
