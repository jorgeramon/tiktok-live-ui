import { createContext, PropsWithChildren, useEffect } from "react";
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
    const { error, socket, connected } = useSocket(import.meta.env.VITE_WS, { auth: { account_id } });

    useEffect(() => {
        Toastify({
            text: connected ? 'Conectado al servidor' : 'Desconectado del servidor'
        }).showToast();
    }, [connected]);

    useEffect(() => {
        if (error) {
            Toastify({
                text: 'No se puede conectar con el servidor'
            }).showToast();
        }
    }, [error]);

    return (
        <SocketContext.Provider value={{ error, socket, connected }}>
            {children}
        </SocketContext.Provider >
    )
}