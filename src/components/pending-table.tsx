import { Button, Stack, Table } from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";
import { useCompleteRequestEvent } from "../events/output/complete-request";
import { useRequests } from "../redux/hooks/requests";

export function PendingTable() {

    const { state: requests } = useRequests();
    const completeRequest = useCompleteRequestEvent();

    function onComplete(request_id: string): void {
        completeRequest({ request_id });
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
                        .sort((r1, r2) => r2.requested_at.getTime() - r1.requested_at.getTime())
                        .map(request => (
                            <tr key={request._id}>
                                <td>{request.request}</td>
                                <td>{request.user_username}</td>
                                <td>{request.user_nickname}</td>
                                <td><ReactTimeAgo date={request.requested_at} /></td>
                                <td>
                                    <Stack direction="horizontal" gap={3}>
                                        <Button variant="success" onClick={() => onComplete(request._id)}><i className="bi bi-check"></i></Button>
                                    </Stack>
                                </td>
                            </tr>
                        ))
                }
            </tbody>
        </Table>
    )
}