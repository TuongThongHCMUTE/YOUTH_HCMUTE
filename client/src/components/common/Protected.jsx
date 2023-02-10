// Node Modules ============================================================ //
import React from 'react';
import { Navigate } from 'react-router-dom';
// Helpers ================================================================= //
import { getRoleFromStorage } from 'helpers/storage';

// ============================|| PROTECTED ||============================== //
const Protected = ({ roles, children }) => {
  const userRole = getRoleFromStorage();
  const index = roles.findIndex(i => i === userRole);

  if (index === -1 || !userRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Protected;
