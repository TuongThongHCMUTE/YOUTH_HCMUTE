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
const UsersStatistic = Loadable(lazy(() => import('components/admin/users/statistic')));
const ManagersManagement = Loadable(lazy(() => import('components/admin/users/managers')));
const StudentsManagement = Loadable(lazy(() => import('components/admin/users/students')));
const ManagerDetail = Loadable(lazy(() => import('components/admin/users/managers/components/ManagerDetail')));
const StudentDetail = Loadable(lazy(() => import('components/admin/users/students/components/StudentDetail')));

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
            path: '/barcode/tra-cuu',
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
            path: '/users/thong-ke-nguoi-dung',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><UsersStatistic /></Protected>
        },
        {
            path: '/users/quan-tri-vien',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><ManagersManagement /></Protected>
        },
        {
            path: '/users/quan-tri-vien/:id',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><ManagerDetail /></Protected>
        },
        {
            path: '/users/sinh-vien',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><StudentsManagement /></Protected>
        },
        {
            path: '/users/sinh-vien/:id',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><StudentDetail /></Protected>
        },
        {
            path: '/system-config',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><div></div></Protected>
        },
    ]
};

export default AdminRoutes;
