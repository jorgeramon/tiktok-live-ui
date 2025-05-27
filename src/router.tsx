import React from 'react';
import { createBrowserRouter } from 'react-router';
import { getRequests, getStatus } from './api';

export default createBrowserRouter([
  {
    path: '/',
    Component: React.lazy(() => import('./pages/home')),
    HydrateFallback: () => null,
  },
  {
    path: '/:account_id/requests',
    Component: React.lazy(() => import('./pages/request')),
    HydrateFallback: () => null,
    loader: async ({ params }) => {
      const [requests, status] = await Promise.all([
        getRequests(params.account_id!),
        getStatus(params.account_id!),
      ]);

      return { requests, status };
    },
  },
  {
    path: '/:account_id/view',
    Component: React.lazy(() => import('./pages/view')),
    HydrateFallback: () => null,
    loader: async ({ params }) => {
      const requests = await getRequests(params.account_id!);
      return { requests, disable_toasts: true };
    },
  },
]);
