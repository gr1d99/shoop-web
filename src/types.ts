/**
 * Core Types/Interfaces
 */
export interface Image {
  readonly id: number;
  name: string;
  alt: string;
  url: string;
}
export interface Cart {
  readonly id: number;
  user_id: number;
}
export interface User {
  readonly id: number;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  current_cart: ResourceReadonly & {
    user_id: number;
  };
}

export interface CartItem {
  id: ResourceReadonly['id'];
  amount: number;
  quantity: number;
  cart_id: number;
  product_id: number;
  sku_id: number;
}

/**
 * Request Types/Interfaces
 */
export interface QueryParams {
  page: number | string;
  limit: number | string;
}
export type RequestParams<CustomParams = any> = Record<string, string | number> &
  Partial<QueryParams> &
  CustomParams;
export type ProductRequestParams = RequestParams & {
  category_slug: string;
};
export type CartRequestParams = RequestParams;
/**
 * API Types/Interfaces
 */
interface ResourceReadonly {
  readonly id: number;
  readonly slug: string;
}
export interface ResourceRelationshipData {
  id: ResourceReadonly['id'];
  type: string;
}
export type ResourceMeta = Record<string, any> | null;
export interface ResourcesDataMeta {
  count: number;
  next_page: number;
  previous_page: number;
  total: number;
  total_pages: number;
}
interface ResourceData<Attributes, Relationships> {
  readonly id: ResourceReadonly['id'];
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}
export interface Resource<Attributes, Relationships> {
  data: ResourceData<Attributes, Relationships>;
}
export type ResourcesData<Attributes, Relationships> = Resource<Attributes, Relationships>['data'];
export interface Resources<Attributes, Relationships> {
  data: Array<ResourcesData<Attributes, Relationships>>;
  meta: ResourcesDataMeta;
}
/**
 * Specific Resources
 */
export type CartResource = Resource<
  Pick<Cart, 'user_id'>,
  {
    items: {
      data: ResourceRelationshipData[];
    };
  }
>;
export interface CartResources {
  data: Array<CartResource['data']>;
  meta: ResourcesDataMeta;
}

export type CartItemResource = Resource<
  Pick<CartItem, 'amount' | 'quantity' | 'product_id' | 'sku_id' | 'cart_id'>,
  any
>;

export type UserResource = Resource<
  Pick<User, 'email' | 'phone' | 'first_name' | 'last_name' | 'current_cart'>,
  {
    carts: {
      data: ResourceRelationshipData[];
    };
  }
>;
export interface UserResources {
  data: Array<UserResource['data']>;
  meta: ResourcesDataMeta;
}
export interface Brand extends ResourceReadonly {
  name: string;
}
export interface Category extends ResourceReadonly {
  name: string;
}
export interface Variant extends ResourceReadonly {
  is_master: boolean;
}
export interface MasterVariant extends Variant {
  price: number;
  stock: number;
  sku_id: number;
}

export interface Product extends ResourceReadonly {
  name: string;
  brand_id: number;
  category_id: number;
  description: string;
  brand: Pick<Brand, 'id' | 'name'>;
  category: Pick<Category, 'id' | 'name'>;
  master: Pick<MasterVariant, 'id' | 'price' | 'stock' | 'sku_id'>;
  meta: ResourceMeta;
  images: Image[];
}

export type ProductResource = Resource<
  Pick<
    Product,
    | 'slug'
    | 'name'
    | 'description'
    | 'brand_id'
    | 'brand'
    | 'category_id'
    | 'category'
    | 'master'
    | 'images'
    | 'meta'
  >,
  {
    master: {
      data: ResourceRelationshipData;
    };
  }
>;
export interface ProductsResources {
  data: Array<ProductResource['data']>;
  meta: ResourcesDataMeta;
}
