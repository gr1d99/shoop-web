export interface QueryParams {
  page: number | string;
  limit: number | string;
}

export type RequestParams = Record<string, string | number> & QueryParams;
