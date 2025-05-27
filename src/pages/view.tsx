import RequestList from '@/components/request-list';
import SocketProvider from '@/contexts/socket';
import { RequestsProvider } from '@/redux/contexts/requests';
import { Stack } from 'react-bootstrap';

import { RequestsAction } from '@/redux/action';
import { useRequests } from '@/redux/hooks/requests';
import '@/view.css';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router';

function Page() {
  const { requests } = useLoaderData();
  const { dispatch: dispatch_requests } = useRequests();

  useEffect(() => {
    if (typeof requests !== 'undefined' && requests !== null) {
      dispatch_requests({ type: RequestsAction.REPLACE_ALL, data: requests });
    }
  }, [requests]);

  return (
    <Stack>
      <RequestList />
    </Stack>
  );
}

export default () => (
  <SocketProvider>
    <RequestsProvider>
      <Page />
    </RequestsProvider>
  </SocketProvider>
);
