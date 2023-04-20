import { type RequestParams } from '../../types';

const usersKeys = {
  all: <P extends RequestParams>(params: P) => {
    return ['users', params];
  }
};

export { usersKeys };
