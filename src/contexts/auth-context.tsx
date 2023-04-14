import React from 'react';
import { type FormValues, type LoginResponse } from '../pages/login/types';
import { useMutation } from 'react-query';
import { createAuthAsync } from '../queries/auth';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { toasts } from '../components/toast';
import * as localforage from 'localforage';
import { useNavigate, useMatch } from 'react-router-dom';
import { type AuthCtxAction, type IAuthContext, type AuthCtxInitialState } from './types';
import { jwtKey } from '../constants';

const { SuccessToast, ErrorListToast } = toasts;

const parseJwt = (token: string): { identity: string; exp: number } => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

const initialState: AuthCtxInitialState = {
  loading: false,
  authenticated: false,
  token: '',
  username: '',
  identity: ''
};

export const AuthContext = React.createContext<IAuthContext>(initialState as IAuthContext);

const authenticate = (
  token: string | null
): { authenticated: boolean; token: string; username: string; identity: string } => {
  let username = '';
  let identity = '';
  if (token !== null) {
    const result = parseJwt(token);
    if (result?.identity !== '') {
      username = result.identity?.split('@')?.[0];
      identity = result.identity;
    }
  }
  return {
    token: token !== null ? token : '',
    authenticated: token !== null,
    username,
    identity
  };
};

const reducer = (
  state: AuthCtxInitialState = initialState,
  action: AuthCtxAction
): AuthCtxInitialState => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_LOADING': {
      return { ...state, loading: payload };
    }

    case 'AUTHENTICATE': {
      const result = authenticate(payload);
      return { ...state, ...result, loading: false };
    }

    default: {
      throw new Error(`Invalid type dispatched ${type as string}`);
    }
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, localDispatch] = React.useReducer(reducer, initialState);
  const navigate = useNavigate();
  const loginMatch = useMatch('/login');
  const isLoginMatch = loginMatch !== null;
  const mutation = useMutation<LoginResponse, unknown, FormValues>({
    mutationFn: async (variables) => {
      return await createAuthAsync(variables);
    },
    mutationKey: 'login'
  });
  const { mutate, data, error, isError, isSuccess, reset } = mutation;
  const boot = React.useRef(false);

  const restoreAuthFromStore = async (): Promise<void> => {
    await localforage
      .getItem<string>(jwtKey)
      .then((value) => {
        localDispatch({ type: 'AUTHENTICATE', payload: value });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (!boot.current) {
      void restoreAuthFromStore();
      boot.current = true;
    }
  }, [boot.current]);

  React.useEffect(() => {
    if (boot.current && isLoginMatch && state.authenticated && !state.loading) {
      navigate('/');
    }
  }, [boot.current, isLoginMatch, state.authenticated, state.loading]);

  React.useEffect(() => {
    if (isError) {
      if (isAxiosError(error)) {
        const { response } = error;
        const message = response?.data?.message;
        toast.custom(<ErrorListToast errors={[message]} title={'Errors'} />);
      }
    }
  }, [isError]);

  React.useEffect(() => {
    if (isSuccess && Boolean(data?.token)) {
      toast.custom(<SuccessToast title="Success" message="Successfully authenticated!" />);
      localforage
        .setItem(jwtKey, data.token)
        .then(async () => {
          return await localforage.getItem<string>(jwtKey);
        })
        .then(restoreAuthFromStore)
        .then(() => {
          navigate('/');
          reset();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isSuccess, state.authenticated]);
  const signInUser: IAuthContext['signInUser'] = (values, setSubmitting) => {
    localDispatch({ type: 'SET_LOADING', payload: true });
    mutate(values, {
      onSettled: () => {
        setSubmitting(false);
      }
    });
  };

  const signOutUser = async () => {
    localDispatch({ type: 'SET_LOADING', payload: true });
    await localforage
      .removeItem(jwtKey)
      .then(restoreAuthFromStore)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AuthContext.Provider value={{ ...state, signInUser, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
