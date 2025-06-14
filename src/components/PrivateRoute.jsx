import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AuthStore from '../stores/AuthStore';

const PrivateRoute = observer(({ children }) => {
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

  return AuthStore.isAuth ? children : <Navigate to="/login" replace/>;
});

export default PrivateRoute;
