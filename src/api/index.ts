import { axiosInstance } from './axios';
import { type ApiHeaders } from './types';

const api = {
  async post<Data, Response>(url: string, data: Data, headers: Partial<ApiHeaders> = {}) {
    return await axiosInstance
      .post<Response>(url, data, {
        headers: { ...headers }
      })
      .then(async ({ data }) => {
        return data;
      })
      .catch(async (error): Promise<any> => {
        return await Promise.reject(error);
      });
  }
};

export default api;
