import CompletedTable from '@/components/completed-table';
import PendingTable from '@/components/pending-table';
import Status from '@/components/status';
import { useGetRequestsEvent } from '@/events/output/get-requests';
import { useGetStatusEvent } from '@/events/output/get-status';
import { RequestsProvider } from '@/redux/contexts/requests';
import { StatusProvider } from '@/redux/contexts/status';
import { useEffect } from 'react';
import { Stack } from 'react-bootstrap';

function Page() {
  const get_requests = useGetRequestsEvent();
  const get_status = useGetStatusEvent();

  useEffect(() => {
    if (get_requests) {
      get_requests();
    }
  }, [get_requests]);

  useEffect(() => {
    if (get_status) {
      get_status();
    }
  }, [get_status]);

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
  <RequestsProvider>
    <StatusProvider>
      <Page />
    </StatusProvider>
  </RequestsProvider>
);
