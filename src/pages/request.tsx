import { useEffect } from "react";
import { PendingTable } from "../components/pending-table";
import { useGetRequestsEvent } from "../events/output/get-requests";

export function RequestPage() {

    const get_requests = useGetRequestsEvent();

    useEffect(() => {
        get_requests();
    }, []);

    return (
        <>
            <h1>Peticiones</h1>
            <PendingTable />
        </>
    )
}