import { Outlet } from "react-router";
import { IoProvider } from "socket.io-react-hook";
import { SocketContextProvider } from "../events/contexts/socket";

export function AuthLayout() {
    return (
        <IoProvider>
            <SocketContextProvider>
                <Outlet />
            </SocketContextProvider>
        </IoProvider>
    );
}