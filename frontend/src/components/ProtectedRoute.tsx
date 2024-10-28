import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const username = useSelector((state: RootState) => state.user.username);
  console.log('Protected Route - Username:', username);  // Log username

  if (!username) {
    console.log('Redirecting to sign-in because no username found.');
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
