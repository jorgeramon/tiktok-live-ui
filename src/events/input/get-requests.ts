import { SocketContext } from '@/contexts/socket';
import { InputSocketEvent } from '@/enums/event';
import { ISocketEvent } from '@/events/interfaces/socket-event';
import { IRequest } from '@/interfaces/request';
import { useContext } from 'react';
import { useSocketEvent } from 'socket.io-react-hook';

export function useGetRequests(account_id: string): IRequest[] | null {
  const { socket } = useContext(SocketContext);

  const event_key = InputSocketEvent.GET_REQUESTS.replace(
    '{account_id}',
    account_id
  );
  const { lastMessage } = useSocketEvent<ISocketEvent<IRequest[]>>(
    socket,
    event_key
  );

  return lastMessage?.ok ? lastMessage.data : null;
}
