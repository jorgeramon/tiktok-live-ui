import { useContext } from "react";
import { useSocketEvent } from "socket.io-react-hook";
import { SocketContext } from "../../contexts/socket";
import { OutputSocketEvent } from "../../enums/event";

export function useGetStatusEvent(): Function {
    const { socket } = useContext(SocketContext);
    const { sendMessage } = useSocketEvent(socket, OutputSocketEvent.GET_STATUS);

    return sendMessage;
}