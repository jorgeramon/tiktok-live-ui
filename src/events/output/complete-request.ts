import { useContext } from "react";
import { useSocketEvent } from "socket.io-react-hook";
import { OutputSocketEvent } from "../../enums/event";
import { SocketContext } from "../contexts/socket";

export function useCompleteRequestEvent(): Function {
    const { socket } = useContext(SocketContext);
    const { sendMessage } = useSocketEvent(socket, OutputSocketEvent.COMPLETE_REQUEST);

    return sendMessage;
}