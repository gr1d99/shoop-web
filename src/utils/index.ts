import { classNames } from './class-names';
import { themes } from './themes';
import { errors } from './errors';
import { cart } from './cart';
import { routePaths } from './routes';

const isNullableOrUndefined = <T>(obj: T): boolean => {
  return obj === undefined || obj === null;
};
export const utils = {
  classNames,
  themes,
  errors,
  cart,
  routePaths,
  isNullableOrUndefined
};
