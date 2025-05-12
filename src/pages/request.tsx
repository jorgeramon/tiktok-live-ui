import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSocketEvent } from "socket.io-react-hook";
import { RequestTable } from "../components/request-table";
import { Status } from "../components/status";
import { SocketContext } from "../contexts/socket";
import { InputSocketEvent, OutputSocketEvent } from "../enums/event";
import { IRequest } from "../interfaces/request";

export function RequestPage() {
    const { account_id } = useParams();
    const { socket, connected } = useContext(SocketContext);
    const { sendMessage } = useSocketEvent(socket, OutputSocketEvent.GET_REQUESTS);
    const { lastMessage: lastMessageRequests } = useSocketEvent(socket, InputSocketEvent.GET_REQUESTS.replace('{account_id}', account_id as string));
    const { lastMessage: lastMessageRequest } = useSocketEvent(socket, InputSocketEvent.REQUEST_CREATED.replace('{account_id}', account_id as string));
    const { lastMessage: lastMessageCompleted } = useSocketEvent(socket, InputSocketEvent.REQUEST_COMPLETED.replace('{account_id}', account_id as string));

    const [requests, setRequests] = useState<IRequest[]>([]);

    useEffect(() => {
        if (connected) {
            sendMessage();
        }
    }, [connected]);

    useEffect(() => {
        if (lastMessageRequests?.ok) {
            setRequests(lastMessageRequests.data);
        }
    }, [lastMessageRequests])

    useEffect(() => {
        if (lastMessageRequest?.ok) {
            setRequests([...requests, lastMessageRequest.data]);
        }
    }, [lastMessageRequest])

    useEffect(() => {
        if (lastMessageCompleted?.ok) {
            const request_id = lastMessageCompleted.data;
            const request = requests.find(request => request._id === request_id);

            if (request) {
                request.completed = true;
                setRequests([...requests]);
            }
        }
    }, [lastMessageCompleted])

    return (
        <>
            <Status />
            <h2>Peticiones</h2>
            <RequestTable requests={requests} />
        </>
    );
}