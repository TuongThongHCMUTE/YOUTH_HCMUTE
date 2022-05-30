import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const Landing = Loadable(lazy(() => import('components/common/landing')))

// ===========================|| PUBLIC ROUTING ||=========================== //

const PublicRoutes = [
    {
        path: '/',
        element: <Landing />
    }
]

export default PublicRoutes;
