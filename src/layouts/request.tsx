import { PropsWithChildren } from "react";
import { RequestsProvider } from "../redux/contexts/requests";
import { StatusProvider } from "../redux/contexts/status";

export function RequestPageLayout({ children }: PropsWithChildren) {
    return (
        <RequestsProvider>
            <StatusProvider>
                {children}
            </StatusProvider>
        </RequestsProvider>
    );
}