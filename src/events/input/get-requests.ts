import { useContext } from "react";
import { useSocketEvent } from "socket.io-react-hook";
import { SocketContext } from "../../contexts/socket";
import { InputSocketEvent } from "../../enums/event";
import { IRequest } from "../../interfaces/request";
import { ISocketEvent } from "../../interfaces/socket-event";

export function useGetRequests(account_id: string): IRequest[] {
    const { socket } = useContext(SocketContext);

    const event_key = InputSocketEvent.GET_REQUESTS.replace('{account_id}', account_id);
    const { lastMessage } = useSocketEvent<ISocketEvent>(socket, event_key);

    return lastMessage.data as IRequest[];
}