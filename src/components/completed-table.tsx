import { IRequest } from '@/interfaces/request';
import { useRequests } from '@/redux/hooks/requests';
import { Table } from 'react-bootstrap';
import ReactTimeAgo from 'react-time-ago';

export default function () {
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
          .filter((request) => request.completed)
          .sort(
            (r1, r2) =>
              new Date(r2.completed_at).getTime() -
              new Date(r1.completed_at).getTime()
          )
          .map((request: IRequest) => (
            <tr key={request._id}>
              <td>{request.request}</td>
              <td>{request.user_username}</td>
              <td>{request.user_nickname}</td>
              <td>
                <ReactTimeAgo date={new Date(request.completed_at)} />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
