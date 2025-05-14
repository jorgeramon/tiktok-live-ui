import { SocketContext } from '@/contexts/socket';
import { InputSocketEvent } from '@/enums/event';
import { IRequestUpdatedEvent } from '@/events/interfaces/request-updated';
import { ISocketEvent } from '@/events/interfaces/socket-event';
import { useContext } from 'react';
import { useSocketEvent } from 'socket.io-react-hook';

export function useRequestUpdated(
  account_id: string
): IRequestUpdatedEvent | null {
  const { socket } = useContext(SocketContext);

  const event_key = InputSocketEvent.REQUEST_UPDATED.replace(
    '{account_id}',
    account_id
  );
  const { lastMessage } = useSocketEvent<ISocketEvent<IRequestUpdatedEvent>>(
    socket,
    event_key
  );

  return lastMessage?.ok ? lastMessage.data : null;
}
