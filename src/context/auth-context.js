import React from 'react';

export default React.createContext({
  token: null,
  username: null,
  role: null,
  lastseen: null,

  userId: null,
  login: (token, userId, role) => {},
  logout: () => {},
});
