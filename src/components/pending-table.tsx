import { useCompleteRequestEvent } from '@/events/output/complete-request';
import { IRequest } from '@/interfaces/request';
import { useRequests } from '@/redux/hooks/requests';
import { Button, Stack, Table } from 'react-bootstrap';
import ReactTimeAgo from 'react-time-ago';

export default function () {
  const { state: requests } = useRequests();

  const completeRequest = useCompleteRequestEvent();

  function onComplete(request_id: string): void {
    completeRequest({ request_id });
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Lugar</th>
          <th>Petición</th>
          <th>Usuario</th>
          <th>Nickname</th>
          <th>Antigüedad</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {requests
          .filter((request) => !request.completed)
          .sort(
            (r1, r2) =>
              new Date(r1.requested_at).getTime() -
              new Date(r2.requested_at).getTime()
          )
          .map((request: IRequest, index: number) => (
            <tr key={request._id}>
              <td>{index + 1}</td>
              <td>{request.request}</td>
              <td>{request.user_username}</td>
              <td>{request.user_nickname}</td>
              <td>
                <ReactTimeAgo date={new Date(request.requested_at)} />
              </td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <Button
                    variant="success"
                    onClick={() => onComplete(request._id)}
                  >
                    <i className="bi bi-check"></i>
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
