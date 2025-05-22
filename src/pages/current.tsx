import RequestSelected from '@/components/request-selected';
import SocketProvider from '@/contexts/socket';
import { RequestsProvider } from '@/redux/contexts/requests';
import { Stack } from 'react-bootstrap';

function Page() {
  return (
    <Stack>
      <RequestSelected />
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
