import { type Image, type Resource, type ResourceMeta, type Resources } from '../../types';

export interface Product {
  readonly id: number;
  slug: string;
  name: string;
  brand_id: number;
  category_id: string;
  description: string;
  meta: ResourceMeta;
  images: Image[];
}
export type ProductResponse = Resource<Omit<Product, 'id'>, []>;
export type ProductsResponse = Resources<Omit<Product, 'id'>, []>;
