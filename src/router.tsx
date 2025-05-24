import { IRequest } from '@/interfaces/request';
import React from 'react';
import { createBrowserRouter } from 'react-router';

const api_url: string = import.meta.env.VITE_API;

async function load_requests(account_id: string): Promise<IRequest[]> {
  try {
    const request = await fetch(`${api_url}/tiktok/${account_id}/requests`);
    const response = await request.json();
    return response.data as IRequest[];
  } catch (err) {
    return [];
  }
}

async function load_status(account_id: string): Promise<boolean> {
  try {
    const request = await fetch(`${api_url}/tiktok/${account_id}/status`);
    const response = await request.json();
    return response.data as boolean;
  } catch (err) {
    return false;
  }
}

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
        load_requests(params.account_id!),
        load_status(params.account_id!),
      ]);

      return { requests, status };
    },
  },
  {
    path: '/:account_id/view',
    Component: React.lazy(() => import('./pages/view')),
    HydrateFallback: () => null,
    loader: async ({ params }) => {
      const requests = await load_requests(params.account_id!);
      return { requests, disable_toasts: true };
    },
  },
]);
