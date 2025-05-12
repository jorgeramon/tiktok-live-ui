import { Outlet } from "react-router";
import { IoProvider } from "socket.io-react-hook";
import { SocketContextProvider } from "../contexts/socket";

export function AuthLayout() {
    return (
        <IoProvider>
            <SocketContextProvider>
                <Outlet />
            </SocketContextProvider>
        </IoProvider>
    );
}