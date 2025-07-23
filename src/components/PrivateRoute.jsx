import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AuthStore from '../stores/AuthStore';

const PrivateRoute = observer(({ children, requireAccess = false }) => {
  useEffect(() => {
    if (!AuthStore.isChecked) {
       // Start token check if it hasn't been done yet
      AuthStore.checkAuth();
    }
  }, []);

  if (AuthStore.isLoading || !AuthStore.isChecked) {
    // While checking authentication, show a loader or placeholderу
    return <div>Loading...</div>; 
  }

  if (!AuthStore.isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (requireAccess && !AuthStore.user?.hasAccess) {
    return <Navigate to="/payment" replace />;
  }

  return children;
});

export default PrivateRoute;
