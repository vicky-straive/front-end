// loginContext.js
import React, { createContext, useState, useEffect } from 'react';

const LoginContext = React.createContext({
    loginCred: null,
    setLoginCred: () => {},
  });

export { LoginContext };
