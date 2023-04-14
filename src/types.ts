/**
 * Core Types/Interfaces
 */
export interface Image {
  readonly id: number;
  name: string;
  alt: string;
  url: string;
}
export interface ICart {
  readonly id: number;
  user_id: number;
}
export interface IUser {
  readonly id: number;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
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

/**
 * API Types/Interfaces
 */
export type ResourceMeta = Record<string, any> | null;
export interface ResourcesDataMeta {
  count: number;
  next_page: number;
  previous_page: number;
  total: number;
  total_pages: number;
}
interface ResourceData<Attributes, Relationships> {
  readonly id: string;
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
export type CartResource = ResourceData<Pick<ICart, 'id' | 'user_id'>, any>;

export type UserResource = Resource<
  Pick<IUser, 'email' | 'phone' | 'first_name' | 'last_name'>,
  {
    carts: {
      data: Array<{ id: number; type: string }>;
    };
  }
>['data'];
export interface UserResources {
  data: UserResource[];
  meta: ResourcesDataMeta;
}
