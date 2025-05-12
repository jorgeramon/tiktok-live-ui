import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSocket } from "socket.io-react-hook";
import Toastify from 'toastify-js';
import { ISocketContext } from "../interfaces/socket-context";

export const SocketContext = createContext<ISocketContext>({
    connected: false,
    socket: null,
    error: null
});

export function SocketContextProvider({ children }: PropsWithChildren) {
    const { account_id } = useParams();
    const { error, socket, connected } = useSocket('localhost:2222', { auth: { account_id } });
    const [error_state, setError] = useState(error);
    const [connected_state, setConnected] = useState(connected);

    useEffect(() => {
        Toastify({
            text: connected ? 'Conectado al servidor' : 'Desconectado del servidor'
        }).showToast();

        setConnected(connected);
    }, [connected]);

    useEffect(() => {
        if (error) {
            Toastify({
                text: 'No se puede conectar con el servidor'
            }).showToast();
        }

        setError(error);
    }, [error]);

    return (
        <SocketContext.Provider value={{ error: error_state, socket, connected: connected_state }}>
            {children}
        </SocketContext.Provider >
    )
}