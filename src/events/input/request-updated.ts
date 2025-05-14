import { useContext } from "react";
import { useSocketEvent } from "socket.io-react-hook";
import { InputSocketEvent } from "../../enums/event";
import { SocketContext } from "../contexts/socket";
import { IRequestUpdatedEvent } from "../interfaces/request-updated";
import { ISocketEvent } from "../interfaces/socket-event";

export function useRequestUpdated(account_id: string): IRequestUpdatedEvent | null {
    const { socket } = useContext(SocketContext);

    const event_key = InputSocketEvent.REQUEST_UPDATED.replace('{account_id}', account_id);
    const { lastMessage } = useSocketEvent<ISocketEvent<IRequestUpdatedEvent>>(socket, event_key);

    return lastMessage?.ok ? lastMessage.data : null;
}