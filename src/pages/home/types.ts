import { type ResourcesDataMeta } from '../../types';

type DataAttributes = Record<string, string | number> & { slug?: string; name: string };
interface DataRelationships {
  products: {
    data: Array<{
      id: string;
      type: string;
    }>;
  };
}
interface Data {
  readonly id: string;
  type: string;
  attributes: DataAttributes;
  relationships: DataRelationships;
}

export interface CategoriesResponse {
  data: Data[];
  meta: ResourcesDataMeta;
}
