import React from 'react';

const AuthContext = React.createContext({
  currentUser: {},
  register: (nombre, email, pass) => {},
  login: (email, pass) => {},
  logout: () => {},
});
export default AuthContext;