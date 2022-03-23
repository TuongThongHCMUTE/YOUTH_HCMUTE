import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const Barcode = Loadable(lazy(() => import('components/admin/barcode')));

// ===========================|| ADMIN ROUTING ||=========================== //

const AdminRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Barcode />
        }
    ]
};

export default AdminRoutes;
