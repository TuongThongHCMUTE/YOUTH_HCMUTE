// Node Modules ============================================================ //
import React, { lazy } from 'react';
// Constants =============================================================== //
import { USER_ROLES } from 'store/constant';
// My components =========================================================== //
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Protected from 'components/common/Protected';
// Pages =================================================================== //
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
            path: 'admin/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/admin',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><Barcode /></Protected>
        },
        {
            path: '/barcode',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><Barcode /></Protected>
        },
        {
            path: '/barcode/thong-ke',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><BarcodeStatistic /></Protected>
        },
        {
            path: '/ho-so',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><div></div></Protected>
        },
        {
            path: '/chi-doan',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><ClassList /></Protected>
        },
        {
            path: '/chi-doan/:id',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><ClassDetail /></Protected>
        },
        {
            path: '/users',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><div></div></Protected>
        },
        {
            path: '/system-config',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><div></div></Protected>
        },
    ]
};

export default AdminRoutes;
