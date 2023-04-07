type DataAttribute = Record<string, string | number> & { slug?: string; name: string };
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
  attributes: DataAttribute;
  relationships: DataRelationships;
}

interface DataMeta {
  count: number;
  next_page: number;
  previous_page: number;
  total: number;
  total_pages: number;
}
export interface CategoriesResponse {
  data: Data[];
  meta: DataMeta;
}
