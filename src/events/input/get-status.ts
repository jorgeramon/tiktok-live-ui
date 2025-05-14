import { useContext } from "react";
import { useSocketEvent } from "socket.io-react-hook";
import { SocketContext } from "../../contexts/socket";
import { InputSocketEvent } from "../../enums/event";
import { IOnlineStatus } from "../../interfaces/online-status";
import { ISocketEvent } from "../../interfaces/socket-event";

export function useGetStatus(account_id: string): IOnlineStatus | undefined {
    const { socket } = useContext(SocketContext);

    const event_key = InputSocketEvent.GET_STATUS.replace('{account_id}', account_id);
    const { lastMessage } = useSocketEvent<ISocketEvent>(socket, event_key);

    return lastMessage?.data as IOnlineStatus;
}