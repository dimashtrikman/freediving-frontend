import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AuthStore from '../stores/AuthStore';

const PrivateRoute = observer(({ children }) => {
  return AuthStore.isAuth ? children : <Navigate to="/login" />;
});

export default PrivateRoute;
