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

// ===========================|| ADMIN ROUTING ||=========================== //

const StudentRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'admin/dashboard/default',
            element: <DashboardDefault />
        },
        // {
        //     path: '/student',
        //     element: <Protected roles={[USER_ROLES.SINH_VIEN]}><div>Sinh viên</div></Protected>
        // },
        {
            path: '/student',
            element: <div>Sinh viên</div>
        },
    ]
};

export default StudentRoutes;
