import { ISocketContext } from '@/events/interfaces/socket-context';
import { createContext, PropsWithChildren, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { IoProvider, useSocket } from 'socket.io-react-hook';
import Toastify from 'toastify-js';

export const SocketContext = createContext<ISocketContext>({
  connected: false,
  socket: null,
  error: null,
});

function Provider({ children }: PropsWithChildren) {
  const { account_id } = useParams();
  const { disable_toasts } = useLoaderData() ?? { disable_toasts: false };
  const { error, socket, connected } = useSocket(import.meta.env.VITE_WS, {
    auth: { account_id },
  });

  if (!disable_toasts) {
    useEffect(() => {
      Toastify({
        text: connected ? 'Conectado al servidor' : 'Desconectado del servidor',
      }).showToast();
    }, [connected]);

    useEffect(() => {
      if (error) {
        Toastify({
          text: 'No se puede conectar con el servidor',
        }).showToast();
      }
    }, [error]);
  }

  return (
    <SocketContext.Provider value={{ error, socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export default ({ children }: PropsWithChildren) => (
  <IoProvider>
    <Provider>{children}</Provider>
  </IoProvider>
);
