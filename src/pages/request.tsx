import { useEffect } from "react";
import { PendingTable } from "../components/pending-table";
import { Status } from "../components/status";
import { useGetRequestsEvent } from "../events/output/get-requests";
import { useGetStatusEvent } from "../events/output/get-status";

export function RequestPage() {

    const get_requests = useGetRequestsEvent();
    const get_status = useGetStatusEvent();

    useEffect(() => {
        if (get_requests) {
            get_requests();
        }
    }, [get_requests]);

    useEffect(() => {
        if (get_status) {
            get_status();
        }
    }, [get_status]);

    return (
        <>
            <Status />
            <PendingTable />
        </>
    )
}