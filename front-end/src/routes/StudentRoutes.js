// Node Modules ============================================================ //
import React, { lazy } from 'react';
// Constants =============================================================== //
import { USER_ROLES } from 'store/constant';
// My components =========================================================== //
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Protected from 'components/common/Protected';
// Pages =================================================================== //
const StudentDashboard = Loadable(lazy(() => import('components/student/dashboard')));
const SearchActivities = Loadable(lazy(() => import('components/student/activities/search')));
const MyActivities = Loadable(lazy(() => import('components/student/activities/personal')));

// ===========================|| ADMIN ROUTING ||=========================== //

const StudentRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'sinh-vien/dashboard',
            element: <Protected roles={[USER_ROLES.SINH_VIEN]}><StudentDashboard /></Protected>
        },
        {
            path: '/tim-kiem',
            element: <Protected roles={[USER_ROLES.SINH_VIEN]}><SearchActivities /></Protected>
        },
        {
            path: '/hoat-dong-cua-toi',
            element: <Protected roles={[USER_ROLES.SINH_VIEN]}><MyActivities /></Protected>
        },
        {
            path: '/student',
            element: <div>Sinh viên</div>
        },
    ]
};

export default StudentRoutes;
