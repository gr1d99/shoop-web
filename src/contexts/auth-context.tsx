import React from 'react';
import { type FormValues, type LoginResponse } from '../pages/login/types';
import { type FormikHelpers } from 'formik';
import { useMutation } from 'react-query';
import { createAuthAsync } from '../pages/login/api/creat-auth';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { toasts } from '../components/toast';
import * as localforage from 'localforage';
import { useNavigate, useMatch } from 'react-router-dom';

const { SuccessToast, ErrorListToast } = toasts;
const jwtKey = '@shoop-jwt';

interface InitialState {
  loading: boolean;
  authenticated: boolean;
  currentUser: null;
  token: string;
  username: string;
}

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

interface IAuthContext extends InitialState {
  signInUser: (data: FormValues, setSubmitting: FormikHelpers<FormValues>['setSubmitting']) => void;
  signOutUser: () => Promise<void>;
}

type Action =
  | {
      type: 'SET_LOADING';
      payload: boolean;
    }
  | {
      type: 'AUTHENTICATE';
      payload: string;
    };

const initialState: InitialState = {
  loading: false,
  authenticated: false,
  currentUser: null,
  token: '',
  username: ''
};

const AuthContext = React.createContext<IAuthContext>(initialState as IAuthContext);

const useAuth = (): IAuthContext => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw Error(`AuthProvider needs to be wrapped around the component`);
  }

  return context;
};

const authenticate = (
  token: string | null
): { authenticated: boolean; token: string; username: string } => {
  let username = '';
  if (token !== null) {
    const result = parseJwt(token);
    if (result?.identity !== '') {
      username = result?.identity?.split('@')?.[0];
    }
  }
  return {
    token: token !== null ? token : '',
    authenticated: token !== null,
    username
  };
};

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_LOADING': {
      return { ...state, loading: payload };
    }

    case 'AUTHENTICATE': {
      const result = authenticate(payload);
      return { ...state, ...result };
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
  const { mutate, data, error, isError, isSuccess } = mutation;

  const boot = React.useRef(false);

  const restoreAuthFromStore = async (): Promise<void> => {
    await localforage
      .getItem<string>(jwtKey)
      .then((value) => {
        if (typeof value === 'string') {
          localDispatch({ type: 'AUTHENTICATE', payload: value });
        }
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
    if (boot.current && isLoginMatch && state.authenticated) {
      navigate('/');
    }
  }, [boot.current, isLoginMatch, state.authenticated]);

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
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isSuccess, state.authenticated]);
  const signInUser: IAuthContext['signInUser'] = (values, setSubmitting) => {
    mutate(values, {
      onSettled: () => {
        setSubmitting(false);
      }
    });
  };

  const signOutUser = async () => {
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

const withAuthProvider = <P,>(Component: React.FC<P>) => {
  const WithAuthProvider = (props: React.ComponentProps<any>) => {
    return (
      <AuthProvider>
        <Component {...props} />
      </AuthProvider>
    );
  };

  return WithAuthProvider;
};

export default AuthProvider;
export { useAuth, withAuthProvider };
