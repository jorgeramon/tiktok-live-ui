import { IRequest } from '@/interfaces/request';
import { useRequests } from '@/redux/hooks/requests';
import { ListGroup } from 'react-bootstrap';

export default function () {
  const { state: requests } = useRequests();

  return (
    <ListGroup variant="flush" as="ol" numbered>
      {requests
        .filter((request) => !request.completed)
        .sort((r1, r2) => r2.completed_at.getTime() - r1.completed_at.getTime())
        .map(({ _id, request, user_nickname }: IRequest) => (
          <ListGroup.Item key={_id} as="li" className="request-list-item">
            {request} - {user_nickname}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}
