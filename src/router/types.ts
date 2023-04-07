import { type Resource, type ResourceMeta } from '../types';
import { type ProductsResponse } from '../pages/products/types';

interface Category {
  readonly id: number;
  readonly slug: string;
  name: string;
  meta: ResourceMeta;
}

export type CategoryResponse = Resource<Pick<Category, 'slug' | 'name' | 'meta'>, any>;

export interface CategoryProductsLoader {
  products: ProductsResponse;
  category: CategoryResponse['data'];
}
