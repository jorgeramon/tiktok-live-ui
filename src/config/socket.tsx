import { useEffect, PropsWithChildren } from 'react';
import { useSocket } from 'socket.io-react-hook';

import Toastify from 'toastify-js';

export default function SocketConfig({ children }: PropsWithChildren) {
    const { error, connected } = useSocket('localhost:2222');

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

    return children;
}