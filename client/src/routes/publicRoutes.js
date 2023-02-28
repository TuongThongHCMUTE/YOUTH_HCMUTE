import React, { lazy } from 'react';
import Loadable from 'components/common/Loadable';

const Landing = Loadable(lazy(() => import('components/landing')))

const publicRoutes = [
  {
    path: '/',
    element: <Landing />
  }
]

export default publicRoutes;