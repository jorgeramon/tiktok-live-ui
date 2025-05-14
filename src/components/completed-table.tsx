import { useRequests } from '@/redux/hooks/requests';
import { Table } from 'react-bootstrap';
import ReactTimeAgo from 'react-time-ago';

export function CompletedTable() {
  const { state: requests } = useRequests();

  return (
    <Table>
      <thead>
        <tr>
          <th>Petición</th>
          <th>Usuario</th>
          <th>Nickname</th>
          <th>Antigüedad</th>
        </tr>
      </thead>
      <tbody>
        {requests
          .filter((request) => request.completed && request.completed_at)
          .sort(
            (r1, r2) => r2.completed_at.getTime() - r1.completed_at.getTime()
          )
          .map((request) => (
            <tr key={request._id}>
              <td>{request.request}</td>
              <td>{request.user_username}</td>
              <td>{request.user_nickname}</td>
              <td>
                <ReactTimeAgo date={request.completed_at} />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
