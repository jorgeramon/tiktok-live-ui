import CompletedTable from '@/components/completed-table';
import PendingTable from '@/components/pending-table';
import RequestSelected from '@/components/request-selected';
import Status from '@/components/status';
import SocketProvider from '@/contexts/socket';
import { RequestsAction, StatusAction } from '@/redux/action';
import { RequestsProvider } from '@/redux/contexts/requests';
import { StatusProvider } from '@/redux/contexts/status';
import { useRequests } from '@/redux/hooks/requests';
import { useStatus } from '@/redux/hooks/status';
import { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { useLoaderData } from 'react-router';

function Page() {
  const { requests, status } = useLoaderData();

  const { dispatch: dispatch_requests } = useRequests();
  const { dispatch: dispatch_status } = useStatus();

  useEffect(() => {
    if (typeof requests !== 'undefined' && requests !== null) {
      dispatch_requests({ type: RequestsAction.REPLACE_ALL, data: requests });
    }
  }, [requests]);

  useEffect(() => {
    if (typeof status !== 'undefined' && status !== null) {
      dispatch_status({ type: StatusAction.REPLACE_ALL, data: status });
    }
  }, [status]);

  return (
    <Stack className="p-2">
      <Status />

      <RequestSelected />

      <Stack className="mt-3">
        <h2 className="text-center">Pendientes</h2>
        <PendingTable />
      </Stack>

      <Stack className="mt-3">
        <h2 className="text-center">Completadas</h2>
        <CompletedTable />
      </Stack>
    </Stack>
  );
}

export default () => (
  <SocketProvider>
    <RequestsProvider>
      <StatusProvider>
        <Page />
      </StatusProvider>
    </RequestsProvider>
  </SocketProvider>
);
