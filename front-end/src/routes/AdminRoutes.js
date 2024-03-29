// Node Modules ============================================================ //
import React, { lazy } from 'react';
// Constants =============================================================== //
import { USER_ROLES } from 'helpers/constants/user';
// My components =========================================================== //
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Protected from 'components/common/Protected';
// Pages =================================================================== //
const DashboardDefault = Loadable(lazy(() => import('components/admin/statistic')));
const Barcode = Loadable(lazy(() => import('components/admin/barcodeSearch')));
const BarcodeStatistic = Loadable(lazy(() => import('components/admin/barcodeStatistic')));
const ClassList = Loadable(lazy(() => import('components/admin/class/classList')));
const ClassDetail = Loadable(lazy(() => import('components/admin/class/classDetail')));
const UsersStatistic = Loadable(lazy(() => import('components/admin/users/statistic')));
const ManagersManagement = Loadable(lazy(() => import('components/admin/users/managers')));
const StudentsManagement = Loadable(lazy(() => import('components/admin/users/students')));
const ManagerDetail = Loadable(lazy(() => import('components/admin/users/managers/components/ManagerDetail')));
const StudentDetail = Loadable(lazy(() => import('components/admin/users/students/components/StudentDetail')));
const EventsManagement = Loadable(lazy(() => import('components/admin/events')));
const AttendanceList = Loadable(lazy(() => import('components/admin/attendances/events')));
const CheckIn = Loadable(lazy(() => import('components/admin/attendances/checkIn')));
const AttendanceManagement = Loadable(lazy(() => import('components/admin/attendances/management')));
const FeeManagement = Loadable(lazy(() => import('components/admin/fees')));
const SchoolYearManagement = Loadable(lazy(() => import('components/admin/schoolYears')));


// ===========================|| ADMIN ROUTING ||=========================== //

const AdminRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/admin/dashboard',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><DashboardDefault /></Protected>
        },
        {
            path: '/cong-tac-vien/dashboard',
            element: <Protected roles={[USER_ROLES.CONG_TAC_VIEN]}><DashboardDefault /></Protected>
        },
        {
            path: '/admin',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}><Barcode /></Protected>
        },
        {
            path: '/barcode/tra-cuu',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}><Barcode /></Protected>
        },
        {
            path: '/barcode/thong-ke',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}><BarcodeStatistic /></Protected>
        },
        {
            path: '/ho-so',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><div></div></Protected>
        },
        // {
        //     path: '/hoat-dong',
        //     element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><EventsManagement /></Protected>
        // },
        {
            path: '/chi-doan',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}><ClassList /></Protected>
        },
        {
            path: '/chi-doan/:id',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}><ClassDetail /></Protected>
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
        // {
        //     path: '/diem-danh',
        //     element: <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}><AttendanceList /></Protected>
        // },
        // {
        //     path: '/diem-danh/:id',
        //     element: <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}><CheckIn /></Protected>
        // },
        {
            path: '/doan-phi',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}><FeeManagement /></Protected>
        },
        {
            path: '/system-config',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><div></div></Protected>
        },
        {
            path: '/nam-hoc',
            element: <Protected roles={[USER_ROLES.DOAN_TRUONG]}><SchoolYearManagement /></Protected>
        },
    ]
};

export default AdminRoutes;
