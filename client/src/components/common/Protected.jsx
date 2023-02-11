// Node Modules ============================================================ //
import React from 'react';
import { Navigate } from 'react-router-dom';
// Helpers ================================================================= //
import { getRoleFromStorage } from 'helpers/storage';
import { HTTP_RESPONSE_STATUS } from 'helpers/http';
// Redux =================================================================== //
import { useDispatch, useSelector } from 'react-redux';
import { errorCodeSelector } from 'redux/selectors/ui-selectors';
import { logout } from 'redux/actions/auth-actions';

// ============================|| PROTECTED ||============================== //
const Protected = ({ roles, children }) => {
  const userRole = getRoleFromStorage();
  const index = roles.findIndex(i => i === userRole);
  const errorCode = useSelector(errorCodeSelector);
  const dispatch = useDispatch();

  if (index === -1 || !userRole || errorCode && errorCode === HTTP_RESPONSE_STATUS.unauthorized) {
    dispatch(logout());
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Protected;
