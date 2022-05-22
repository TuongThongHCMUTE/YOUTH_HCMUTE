// Node Modules ============================================================ //
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// ============================|| PROTECTED ||============================== //
const Protected = ({ roles, children }) => {
    const userRole = sessionStorage.getItem('role');
    const index = roles.findIndex(i => i === userRole);

    if (index === -1 || !userRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default Protected