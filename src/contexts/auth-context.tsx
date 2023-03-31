import React from 'react';

interface InitialState {
  loading: boolean;
  authenticated: boolean;
  currentUser: null;
}

interface IAuthContext extends InitialState {}

interface Action {
  type: 'SET_LOADING';
  payload: boolean;
}

const initialState: InitialState = {
  loading: false,
  authenticated: false,
  currentUser: null
};

const AuthContext = React.createContext<IAuthContext>(initialState as IAuthContext);

const useAuth = (): IAuthContext => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw Error(`AuthProvider needs to be wrapped around the component`);
  }

  return context;
};

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_LOADING': {
      return { ...state, loading: payload };
    }
  }
  throw new Error(`Invalid type dispatched ${action.type}`);
};

const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, _] = React.useReducer(reducer, initialState);

  return <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>;
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
