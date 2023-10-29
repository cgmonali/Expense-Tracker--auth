import React, { useState, useEffect, useCallback } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Initialize with token from localStorage

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken('');
    localStorage.removeItem('token');
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  // Remove the 'setToken(localStorage.getItem('token'))' line and use 'token' directly in contextValue

  const contextValue = {
    token: token, // Use 'token' here
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
