import { SocketContext } from '@/contexts/socket';
import { InputSocketEvent } from '@/enums/event';
import { ISocketEvent } from '@/events/interfaces/socket-event';
import { useContext } from 'react';
import { useSocketEvent } from 'socket.io-react-hook';

export function useGetStatus(account_id: string): boolean | null {
  const { socket } = useContext(SocketContext);

  const event_key = InputSocketEvent.GET_STATUS.replace(
    '{account_id}',
    account_id
  );
  const { lastMessage } = useSocketEvent<ISocketEvent<boolean>>(
    socket,
    event_key
  );

  return lastMessage?.ok ? lastMessage.data : null;
}
