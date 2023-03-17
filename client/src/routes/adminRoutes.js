// Node Modules ============================================================ //
import React, { lazy } from 'react';
// Constants =============================================================== //
import { USER_ROLES } from 'helpers/auth';
// My components =========================================================== //
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/common/Loadable';
import Protected from 'components/common/Protected';
// Pages =================================================================== //
const BarcodeSearchPage = Loadable(
  lazy(() => import('components/admin/barcode/search/BarcodeSearchPage'))
);
const BarcodeStatisticPage = Loadable(
  lazy(() => import('components/admin/barcode/statistic/BarcodeStatisticPage'))
);
const ClassManagementPage = Loadable(
  lazy(() => import('components/admin/classes/list/ClassManagementPage'))
);
const ClassDetailPage = Loadable(
  lazy(() => import('components/admin/classes/detail/ClassDetailPage'))
);
const YearManagementPage = Loadable(
  lazy(() => import('components/admin/years/YearManagementPage'))
);

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
    },
    {
      path: '/barcode/tra-cuu',
      element: (
        <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}>
          <BarcodeSearchPage />
        </Protected>
      )
    },
    {
      path: '/barcode/thong-ke',
      element: (
        <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}>
          <BarcodeStatisticPage />
        </Protected>
      )
    },
    {
      path: '/chi-doan',
      element: (
        <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}>
          <ClassManagementPage />
        </Protected>
      )
    },
    {
      path: '/chi-doan/:id',
      element: (
        <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}>
          <ClassDetailPage />
        </Protected>
      )
    },
    {
      path: '/nam-hoc',
      element: (
        <Protected roles={[USER_ROLES.DOAN_TRUONG, USER_ROLES.CONG_TAC_VIEN]}>
          <YearManagementPage />
        </Protected>
      )
    },
  ]
};
export default adminRoutes;
