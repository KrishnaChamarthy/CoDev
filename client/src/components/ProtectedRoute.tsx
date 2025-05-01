// src/components/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase/config';

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!auth.currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;