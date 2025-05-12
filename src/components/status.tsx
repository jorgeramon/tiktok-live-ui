import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useSocketEvent } from "socket.io-react-hook";
import { SocketContext } from "../contexts/socket";
import { InputSocketEvent, OutputSocketEvent } from "../enums/event";

export function Status() {
    const { account_id } = useParams();
    const { socket } = useContext(SocketContext);
    const { sendMessage } = useSocketEvent(socket, OutputSocketEvent.GET_STATUS);
    const { lastMessage } = useSocketEvent(socket, InputSocketEvent.GET_STATUS.replace('{account_id}', account_id as string));

    useEffect(() => {
        sendMessage();
    }, []);

    return (
        <p>Estatus: {lastMessage?.ok && lastMessage.data.is_online ? 'En Línea' : 'Fuera de Línea'} </p>
    )
}