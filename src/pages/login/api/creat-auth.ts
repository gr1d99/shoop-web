import { type FormValues, type LoginResponse } from '../types';
import api from '../../../api';

const createAuthAsync = async (params: FormValues) => {
  return await api.post<FormValues, LoginResponse>('/auth', params);
};

export { createAuthAsync };
