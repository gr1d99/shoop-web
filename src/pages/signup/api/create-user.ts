import { type SignupResponse, type SignupValues } from '../types';
import api from '../../../api';

const createUserAsync = async (values: SignupValues) => {
  return await api.post<{ user: SignupValues }, SignupResponse>('/users', { user: { ...values } });
};

export { createUserAsync };
