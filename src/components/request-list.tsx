import { IRequest } from '@/interfaces/request';
import { useRequests } from '@/redux/hooks/requests';
import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

export default function () {
  const { state: requests } = useRequests();

  const $requests = requests
    .filter((request) => !request.completed)
    .sort(
      (r1, r2) =>
        new Date(r1.requested_at).getTime() -
        new Date(r2.requested_at).getTime()
    );

  useEffect(() => {
    setTimeout(() => {
      if ($requests.length > 0) {
        const element = document.getElementById(
          $requests[$requests.length - 1]._id
        );

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });

          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 5000);
        }
      }
    });
  }, [requests]);

  return (
    <>
      <ListGroup variant="flush" className="bg-transparent">
        {!$requests.length ? (
          <ListGroup.Item
            as="li"
            className="fade request-list-item bg-transparent"
          >
            No hay canciones pendientes
          </ListGroup.Item>
        ) : null}
        {$requests.map(
          ({ _id, request, user_nickname }: IRequest, index: number) => (
            <ListGroup.Item
              id={_id}
              key={_id}
              as="li"
              className="request-list-item bg-transparent"
            >
              {index + 1}. {request} - {user_nickname}
            </ListGroup.Item>
          )
        )}
      </ListGroup>
      <div id="empty-space"></div>
    </>
  );
}
