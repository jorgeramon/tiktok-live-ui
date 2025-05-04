import { PropsWithChildren } from "react";
import { IoProvider } from "socket.io-react-hook";

import SocketConfig from "./socket";

export default function ProviderConfig({ children }: PropsWithChildren) {
    return (
        <IoProvider>
            <SocketConfig>
                {children}
            </SocketConfig>
        </IoProvider>
    )
}