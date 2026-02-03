// features/authentication/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { Spin } from 'antd';

const ProtectedRoute = ({ allowedRoles = ['admin', 'operator'] }) => {
  const { currentUser, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but no valid role
  if (!userRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Client trying to access admin/operator routes
  if (userRole === 'client' && !allowedRoles.includes('client')) {
    return <Navigate to="/client-portal" replace />;
  }

  // Admin/Operator trying to access client routes (shouldn't happen, but just in case)
  if (
    (userRole === 'admin' || userRole === 'operator') &&
    allowedRoles.includes('client') &&
    !allowedRoles.includes(userRole)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
