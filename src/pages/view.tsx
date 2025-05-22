import RequestList from '@/components/request-list';
import SocketProvider from '@/contexts/socket';
import { RequestsProvider } from '@/redux/contexts/requests';
import { Stack } from 'react-bootstrap';

import '@/view.css';

function Page() {
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
