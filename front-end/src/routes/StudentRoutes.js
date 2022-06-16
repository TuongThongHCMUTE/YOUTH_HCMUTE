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
const SearchActivities = Loadable(lazy(() => import('components/student/activities/seach')));

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
            path: '/student',
            element: <div>Sinh viên</div>
        },
    ]
};

export default StudentRoutes;
