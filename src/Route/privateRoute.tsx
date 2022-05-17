import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpinLoader from "../components/SpinLoader";
import { getLoading } from 'seletors/AppSelector';
import { RouteWrapper } from './styles';

const PrivateRoute = ({ children }) => {
  const loading = useSelector(getLoading);

  const user = localStorage.getItem("user") || "";

  if(!user) {
    return <Navigate to='/' />
  }

  return (
    <>
      <RouteWrapper>
        { loading && <SpinLoader /> }
        { children }
      </RouteWrapper>
    </>
  )
};

export default PrivateRoute;
