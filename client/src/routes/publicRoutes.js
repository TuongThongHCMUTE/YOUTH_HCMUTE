import React, { lazy } from 'react';
import Loadable from 'components/common/Loadable';

const LandingPage = Loadable(lazy(() => import('components/LandingPage/LandingPage')))

const publicRoutes = [
  {
    path: '/',
    element: <LandingPage />
  }
]

export default publicRoutes;