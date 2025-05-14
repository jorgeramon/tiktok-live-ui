import { PropsWithChildren } from "react";
import { RequestsProvider } from "../redux/contexts/requests";

export function RequestPageLayout({ children }: PropsWithChildren) {
    return (
        <RequestsProvider>
            {children}
        </RequestsProvider>
    );
}