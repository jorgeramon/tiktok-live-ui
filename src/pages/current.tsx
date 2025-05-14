import RequestSelected from '@/components/request-selected';
import { useGetRequestsEvent } from '@/events/output/get-requests';
import { RequestsProvider } from '@/redux/contexts/requests';
import { useEffect } from 'react';
import { Stack } from 'react-bootstrap';

function Page() {
  const get_requests = useGetRequestsEvent();

  useEffect(() => {
    if (get_requests) {
      get_requests();
    }
  }, [get_requests]);

  return (
    <Stack>
      <RequestSelected />
    </Stack>
  );
}

export default () => (
  <RequestsProvider>
    <Page />
  </RequestsProvider>
);
