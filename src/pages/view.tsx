import RequestList from '@/components/request-list';
import SocketProvider from '@/contexts/socket';
import { RequestsAction } from '@/redux/action';
import { RequestsProvider } from '@/redux/contexts/requests';
import { StatusProvider } from '@/redux/contexts/status';
import { useRequests } from '@/redux/hooks/requests';
import { useStatus } from '@/redux/hooks/status';
import '@/view.css';
import 'animate.css';
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
    <Stack>
      <RequestList />
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
