import { useContext } from "react";
import { useSocketEvent } from "socket.io-react-hook";
import { OutputSocketEvent } from "../../enums/event";
import { SocketContext } from "../contexts/socket";

export function useGetStatusEvent(): Function {
    const { socket } = useContext(SocketContext);
    const { sendMessage } = useSocketEvent(socket, OutputSocketEvent.GET_STATUS);

    return sendMessage;
}