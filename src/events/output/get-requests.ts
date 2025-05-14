import { useContext } from "react";
import { useSocketEvent } from "socket.io-react-hook";
import { OutputSocketEvent } from "../../enums/event";
import { SocketContext } from "../contexts/socket";

export function useGetRequestsEvent(): Function {
    const { socket } = useContext(SocketContext);
    const { sendMessage } = useSocketEvent(socket, OutputSocketEvent.GET_REQUESTS);

    return sendMessage;
}