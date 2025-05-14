import { IRequest } from '@/interfaces/request';
import { useRequests } from '@/redux/hooks/requests';
import { ListGroup } from 'react-bootstrap';

export default function () {
  const { state: requests } = useRequests();

  const current: IRequest | null =
    requests.find((request) => request.current) ?? null;

  return current !== null ? (
    <ListGroup variant="flush">
      <ListGroup.Item as="li" className="request-list-item">
        {current.request}
      </ListGroup.Item>
    </ListGroup>
  ) : null;
}
