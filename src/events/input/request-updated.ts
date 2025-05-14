import { useContext } from "react";
import { useSocketEvent } from "socket.io-react-hook";
import { SocketContext } from "../../contexts/socket";
import { InputSocketEvent } from "../../enums/event";
import { ISocketEvent } from "../../interfaces/socket-event";

type EventData = { request_id: string; new_request: string };

export function useRequestUpdated(account_id: string): EventData {
    const { socket } = useContext(SocketContext);

    const event_key = InputSocketEvent.REQUEST_UPDATED.replace('{account_id}', account_id);
    const { lastMessage } = useSocketEvent<ISocketEvent>(socket, event_key);

    return lastMessage.data as EventData;
}