import { type ProductsResources, type Resource, type ResourceMeta } from '../types';

interface Category {
  readonly id: number;
  readonly slug: string;
  name: string;
  meta: ResourceMeta;
}

export type CategoryResponse = Resource<Pick<Category, 'slug' | 'name' | 'meta'>, any>;

export interface CategoryProductsLoader {
  products: ProductsResources;
  category: CategoryResponse['data'];
}
