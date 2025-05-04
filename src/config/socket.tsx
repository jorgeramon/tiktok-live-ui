import { useEffect, PropsWithChildren } from 'react';
import { useSocket } from 'socket.io-react-hook';

import { toast } from '../utils/sweet-alert';

export default function SocketConfig({ children }: PropsWithChildren) {
    const { error, connected } = useSocket('localhost:2222');

    useEffect(() => {
        async function isConnected() {
            await toast.fire({
                icon: 'info',
                text: connected ? 'Conectado al servidor' : 'Desconectado del servidor'
            });
        }

        isConnected();
    }, [connected]);

    useEffect(() => {
        async function hasError() {
            if (error) {
                await toast.fire({
                    icon: 'error',
                    text: 'No se puede establecer conexión con el servidor'
                });
            }
        }

        hasError();
    }, [error]);

    return children;
}