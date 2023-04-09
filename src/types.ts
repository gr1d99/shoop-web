import { Attributes } from 'react';

export interface QueryParams {
  page: number | string;
  limit: number | string;
}

export type RequestParams = Record<string, string | number> & QueryParams;
export type ProductRequestParams = RequestParams & {
  category_slug: string;
};

export interface Image {
  readonly id: number;
  name: string;
  alt: string;
  url: string;
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
  meta: ResourceMeta;
}
