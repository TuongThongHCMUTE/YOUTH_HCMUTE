import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Barcode = Loadable(lazy(() => import('components/admin/barcodeSearch')));
const BarcodeStatistic = Loadable(lazy(() => import('components/admin/barcodeStatistic')));
const ClassList = Loadable(lazy(() => import('components/admin/class/classList')));
const ClassDetail = Loadable(lazy(() => import('components/admin/class/classDetail')));

// ===========================|| ADMIN ROUTING ||=========================== //

const AdminRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/dashboard/default',
            // element: <DashboardDefault />
            element: <div></div>
        },
        {
            path: '/admin',
            element: <Barcode />
        },
        {
            path: '/barcode',
            element: <Barcode />
        },
        {
            path: '/barcode/thong-ke',
            element: <BarcodeStatistic />
        },
        {
            path: '/ho-so',
            // element: <DashboardDefault />
            element: <div></div>
        },
        {
            path: '/chi-doan',
            element: <ClassList />
        },
        {
            path: '/chi-doan/:id',
            element: <ClassDetail />
        },
        {
            path: '/users',
            // element: <DashboardDefault />
            element: <div></div>
        },
        {
            path: '/system-config',
            // element: <DashboardDefault />
            element: <div></div>
        },
    ]
};

export default AdminRoutes;
