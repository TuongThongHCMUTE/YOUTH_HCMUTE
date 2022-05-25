// Node Modules ============================================================ //
import React from 'react';
import { Navigate } from 'react-router-dom';

// ============================|| PROTECTED ||============================== //
const Protected = ({ roles, children }) => {
    const userRole = sessionStorage.getItem('role');
    const index = roles.findIndex(i => i === userRole);

    // Redirect to home page if the user does not have permission
    if (index === -1 || !userRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default Protected