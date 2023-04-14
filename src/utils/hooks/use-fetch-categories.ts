import { type QueryParams, type RequestParams } from '../../types';
import { useQuery } from 'react-query';
import { fetchCategories } from '../../queries/categories';
import { type CategoriesResponse } from '../../pages/home/types';

const useFetchCategories = (
  params: QueryParams
): { data: CategoriesResponse | undefined; isSuccess: boolean; isFetching: boolean } => {
  const { data, isSuccess, isFetching } = useQuery(['categories', params], {
    queryFn: async (context) => {
      const { queryKey } = context;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, params] = queryKey;
      return await fetchCategories(params as RequestParams);
    }
  });

  return { data, isSuccess, isFetching };
};

export { useFetchCategories };
