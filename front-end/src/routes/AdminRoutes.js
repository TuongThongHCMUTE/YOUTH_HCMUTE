import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Barcode = Loadable(lazy(() => import('components/admin/barcodeSearch')));
const BarcodeStatistic = Loadable(lazy(() => import('components/admin/barcodeStatistic')));

// ===========================|| ADMIN ROUTING ||=========================== //

const AdminRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Barcode />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/barcode',
            element: <Barcode />
        },
        {
            path: '/barcode/thong-ke',
            element: <BarcodeStatistic />
        }
    ]
};

export default AdminRoutes;
