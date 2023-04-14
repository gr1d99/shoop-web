import { useQuery } from 'react-query';
import { type RequestParams, type UserResources } from '../types';
import api from '../api';

const useFetchUsers = <P>(
  params: RequestParams<P>,
  options: { isEnabled: boolean } = { isEnabled: false }
) => {
  const { isEnabled } = options;
  return useQuery(
    ['users', params],
    async (key) => {
      return await api.getAll<RequestParams<P>, UserResources>('/users', params, {
        'X-AUTHENTICATE': true
      });
    },
    { enabled: isEnabled }
  );
};

export { useFetchUsers };
