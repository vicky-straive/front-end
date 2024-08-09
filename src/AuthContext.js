import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  handlePostCall: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const handlePostCall = (newToken) => {
    const url = window.location.href.split("?")[1];
    setToken(newToken);
    // Your existing handlePostCall logic here
    console.log("url:", url); // Example usage
    console.log("Token received in context:", token); // Example usage
    debugger;
  };

  return (
    <AuthContext.Provider value={{ handlePostCall, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
