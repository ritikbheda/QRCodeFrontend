import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ NewComponent, ...rest }) => {
  const token = Cookies.get('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <NewComponent {...rest} />;
};

export default ProtectedRoute;
