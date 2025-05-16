import { IRequest } from '@/interfaces/request';
import { useRequests } from '@/redux/hooks/requests';
import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

export default function () {
  const { state: requests } = useRequests();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  }, [requests]);

  return (
    <ListGroup variant="flush" className="bg-transparent">
      {!requests.filter((request) => !request.completed).length ? (
        <ListGroup.Item as="li" className="request-list-item bg-transparent">
          No hay canciones pendientes
        </ListGroup.Item>
      ) : null}
      {requests
        .filter((request) => !request.completed)
        .sort(
          (r1, r2) =>
            new Date(r1.requested_at).getTime() -
            new Date(r2.requested_at).getTime()
        )
        .map(({ _id, request, user_nickname }: IRequest, index: number) => (
          <ListGroup.Item
            key={_id}
            as="li"
            className="request-list-item bg-transparent"
          >
            {index + 1}. {request} - {user_nickname}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}
