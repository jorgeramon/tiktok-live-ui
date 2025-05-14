import { useCompleteRequestEvent } from '@/events/output/complete-request';
import { useSelectRequestEvent } from '@/events/output/select-request';
import { useRequests } from '@/redux/hooks/requests';
import { Button, Stack, Table } from 'react-bootstrap';
import ReactTimeAgo from 'react-time-ago';

export default function () {
  const { state: requests } = useRequests();

  const completeRequest = useCompleteRequestEvent();
  const selectRequest = useSelectRequestEvent();

  function onComplete(request_id: string): void {
    completeRequest({ request_id });
  }

  function onSelect(request_id: string): void {
    selectRequest({ request_id });
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
        {requests
          .filter((request) => !request.completed)
          .sort(
            (r1, r2) => r2.requested_at.getTime() - r1.requested_at.getTime()
          )
          .map((request) => (
            <tr key={request._id}>
              <td>{request.request}</td>
              <td>{request.user_username}</td>
              <td>{request.user_nickname}</td>
              <td>
                <ReactTimeAgo date={request.requested_at} />
              </td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <Button
                    variant="warning"
                    onClick={() => onSelect(request._id)}
                  >
                    <i className="bi bi-play"></i>
                  </Button>

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
