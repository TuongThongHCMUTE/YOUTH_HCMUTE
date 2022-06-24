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
const SearchActivities = Loadable(lazy(() => import('components/student/activities/search')));
const MyActivities = Loadable(lazy(() => import('components/student/activities/personal')));

// ===========================|| ADMIN ROUTING ||=========================== //

const StudentRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'admin/dashboard/default',
            element: <DashboardDefault />
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
