import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = localStorage.getItem("token"); // Check if user is logged in
  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Element /> : <Navigate to="/" replace />}
    />
  );
};

export default PrivateRoute;
