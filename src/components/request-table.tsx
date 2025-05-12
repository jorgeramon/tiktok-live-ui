import { useContext } from "react";
import { Button, Stack, Table } from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";
import { useSocketEvent } from "socket.io-react-hook";
import { SocketContext } from "../contexts/socket";
import { OutputSocketEvent } from "../enums/event";
import { IRequest } from "../interfaces/request";

interface IRequestTableProps {
    requests: IRequest[];
}

export function RequestTable({ requests }: IRequestTableProps) {

    const { socket } = useContext(SocketContext);
    const { sendMessage } = useSocketEvent(socket, OutputSocketEvent.COMPLETE_REQUEST);

    function onComplete(request_id: string): void {
        sendMessage({ request_id });
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Petición</th>
                    <th>Usuario</th>
                    <th>Nickname</th>
                    <th>Antigüedad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    requests
                        .filter(request => !request.completed)
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map(request => (
                            <tr key={request._id}>
                                <td>{request.request}</td>
                                <td>{request.user_username}</td>
                                <td>{request.user_nickname}</td>
                                <td><ReactTimeAgo date={new Date(request.createdAt)} /></td>
                                <td>
                                    <Stack direction="horizontal" gap={3}>
                                        <Button variant="success" onClick={() => onComplete(request._id)}><i className="bi bi-check"></i></Button>
                                    </Stack>
                                </td>
                            </tr>
                        ))
                }
                {
                    requests
                        .filter(request => request.completed)
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map(request => (
                            <tr key={request._id} className="request-completed">
                                <td>{request.request}</td>
                                <td>{request.user_username}</td>
                                <td>{request.user_nickname}</td>
                                <td><ReactTimeAgo date={new Date(request.createdAt)} /></td>
                                <td></td>
                            </tr>
                        ))
                }
            </tbody>
        </Table>
    )
}