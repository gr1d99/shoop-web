import { type AxiosError } from 'axios';

const buildServerFormErrors = (errors: Record<string, string[]>) => {
  return Object.keys(errors).reduce<string[]>((acc, key) => {
    const keyErrors = errors[key];
    if (keyErrors.length > 1) {
      return [...acc, keyErrors.join(`${key} `)];
    } else {
      return [...acc, `${key} ${keyErrors[0]}`];
    }
  }, []);
};

const resolveResourceError = (error: AxiosError | Error) => {
  throw error;
};

export const errors = {
  buildServerFormErrors,
  resolveResourceError
};
