import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { authApi } from 'src/api/auth';


const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_UP: 'SIGN_UP',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    // const user = action.payload;

      const user = {
      "createdAt": "2023-07-03T04:06:35.831Z",
      "first_name": "Admin",
      "last_name": "",
      "avatar": "/assets/avatars/avatar-penjani-inyene.png",
      "phone": "(652) 200-2231",
      "gender": "male",
      "birthday": "1983-08-13T23:16:44.104Z",
      "role": "admin",
      "email": "admin@gmail.com",
      "id": "11111",
      "password": "admin123"
      }



    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_UP]: (state, action) => {
    return {
      ...state,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.INITIALIZE
    });
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (email, password) => {

    try {

      const user = await authApi.signIn({ email, password });
      console.log(user)
      window.sessionStorage.setItem('authenticated', 'true');

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user
      });
    } catch (error) {
      console.error('[Auth Api - Sign In]:', error);
      throw new Error('Please check your email and password');
    }
  };

  const signUp = async (email, name, password) => {
    try {
      console.log("Done")
      await authApi.signUp({ email, name, password });
      dispatch({
        type: HANDLERS.SIGN_UP,
      });
    } catch (error) {
      console.error('[Auth Api - Sign Up]:', error);
      throw new Error('Sign up is not implemented');
    }
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
