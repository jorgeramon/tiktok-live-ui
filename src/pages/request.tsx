import CompletedTable from '@/components/completed-table';
import PendingTable from '@/components/pending-table';
import Status from '@/components/status';
import SocketProvider from '@/contexts/socket';
import { RequestsAction } from '@/redux/action';
import { RequestsProvider } from '@/redux/contexts/requests';
import { StatusProvider } from '@/redux/contexts/status';
import { useRequests } from '@/redux/hooks/requests';
import { useStatus } from '@/redux/hooks/status';
import { useEffect } from 'react';
import { Stack } from 'react-bootstrap';

function Page() {
  const { state: status } = useStatus();
  const { dispatch } = useRequests();

  useEffect(() => {
    if (typeof status !== 'undefined' && status !== null && !status) {
      dispatch({ type: RequestsAction.REPLACE_ALL, data: [] });
    }
  }, [status]);

  return (
    <Stack className="p-2">
      <Status />

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
