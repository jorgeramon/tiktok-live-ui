import { useContext } from "react";
import { useSocketEvent } from "socket.io-react-hook";
import { SocketContext } from "../../contexts/socket";
import { InputSocketEvent } from "../../enums/event";
import { ISocketEvent } from "../../interfaces/socket-event";

export function useRequestCompleted(account_id: string): string | undefined {
    const { socket } = useContext(SocketContext);

    const event_key = InputSocketEvent.REQUEST_COMPLETED.replace('{account_id}', account_id);
    const { lastMessage } = useSocketEvent<ISocketEvent>(socket, event_key);

    return lastMessage?.data as string;
}