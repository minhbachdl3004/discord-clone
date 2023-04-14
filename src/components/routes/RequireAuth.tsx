import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth(props : any) {
  const { children } = props;

  const token = localStorage.getItem("token")

  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}