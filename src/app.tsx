import SocketProvider from '@/contexts/socket';
import Router from '@/router';

export default function App() {
  return (
    <SocketProvider>
      <Router />
    </SocketProvider>
  );
}
