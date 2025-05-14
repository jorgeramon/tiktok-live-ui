import { useContext } from "react";
import { useSocketEvent } from "socket.io-react-hook";
import { InputSocketEvent } from "../../enums/event";
import { IRequest } from "../../interfaces/request";
import { SocketContext } from "../contexts/socket";
import { ISocketEvent } from "../interfaces/socket-event";

export function useRequestCreated(account_id: string): IRequest | null {
    const { socket } = useContext(SocketContext);

    const event_key = InputSocketEvent.REQUEST_CREATED.replace('{account_id}', account_id);
    const { lastMessage } = useSocketEvent<ISocketEvent<IRequest>>(socket, event_key);

    return lastMessage?.ok ? lastMessage.data : null;
}