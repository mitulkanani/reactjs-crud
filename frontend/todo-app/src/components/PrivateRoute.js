import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const PrivateRoute = ({ Component, isAuthenticated, ...rest }) => {
    console.log(Component, "asd");
  return (
    <Routes>
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to={{ pathname: '/login' }} />
        )
      }
    />
    </Routes>
  );
};

export default PrivateRoute;
