import { IRequest } from '@/interfaces/request';
import { useRequests } from '@/redux/hooks/requests';
import { Image, ListGroup, Stack } from 'react-bootstrap';

export default function () {
  const { state: requests } = useRequests();

  const $requests = requests
    .filter((request) => !request.completed)
    .sort(
      (r1, r2) =>
        new Date(r1.requested_at).getTime() -
        new Date(r2.requested_at).getTime()
    );

  return (
    <>
      <ListGroup variant="flush" className="bg-transparent">
        {!$requests.length ? (
          <ListGroup.Item as="li" className="request-list-item bg-transparent">
            No hay canciones pendientes
          </ListGroup.Item>
        ) : null}
        {$requests.map(
          ({ _id, request, user_nickname, user_picture }: IRequest) => (
            <ListGroup.Item
              id={_id}
              key={_id}
              as="li"
              className="request-list-item bg-transparent"
            >
              <Stack direction="horizontal" gap={2}>
                <Image src={user_picture} roundedCircle />
                <Stack className="ms-3 justify-content-center">
                  <h3>{user_nickname}</h3>
                  <h4>{request}</h4>
                </Stack>
              </Stack>
            </ListGroup.Item>
          )
        )}
      </ListGroup>
    </>
  );
}
