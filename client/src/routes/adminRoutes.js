// Node Modules ============================================================ //
import React, { lazy } from 'react';
// Constants =============================================================== //
import { USER_ROLES } from 'helpers/auth';
// My components =========================================================== //
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/common/Loadable';
import Protected from 'components/common/Protected';
// Pages =================================================================== //

// ===========================|| ADMIN ROUTING ||=========================== //
const adminRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/admin/dashboard',
      element: (
        <Protected roles={[USER_ROLES.ADMIN, USER_ROLES.DOAN_TRUONG]}>
          <div>Admin Dashboard</div>
        </Protected>
      )
    }
  ]
};
export default adminRoutes;
