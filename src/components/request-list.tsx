import { IRequest } from '@/interfaces/request';
import { useRequests } from '@/redux/hooks/requests';
import { useEffect } from 'react';
import { Image, ListGroup, Stack } from 'react-bootstrap';

function isElementVisible(el: HTMLElement) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

function scrollAnimation(request: IRequest | null) {
  if (request !== null) {
    const element = document.getElementById(request._id);

    if (element !== null && !isElementVisible(element)) {
      element.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        window.scrollTo({ behavior: 'smooth', top: 0 });
      }, 4000);
    }
  }
}

export default function () {
  const { state: requests, last_added, last_updated } = useRequests();

  const $requests = requests
    .filter((request) => !request.completed)
    .sort(
      (r1, r2) =>
        new Date(r1.requested_at).getTime() -
        new Date(r2.requested_at).getTime()
    );

  useEffect(() => {
    scrollAnimation(last_added);
  }, [last_added]);

  useEffect(() => {
    scrollAnimation(last_updated);
  }, [last_updated]);

  return (
    <>
      <ListGroup variant="flush" className="bg-transparent">
        {$requests.map(
          (
            { _id, request, user_nickname, user_picture }: IRequest,
            index: number
          ) => (
            <ListGroup.Item
              id={_id}
              key={_id}
              as="li"
              className={`request-list-item ${
                last_added?._id === _id ? 'animation_highlight' : ''
              } ${last_updated?._id === _id ? 'animation_highlight' : ''}`}
            >
              <Stack direction="horizontal" gap={3}>
                <h2>{index + 1}.</h2>
                <Image src={user_picture} roundedCircle />
                <Stack className="ms-3 justify-content-center">
                  <h2>{user_nickname}</h2>
                  <h3>{request}</h3>
                </Stack>
              </Stack>
            </ListGroup.Item>
          )
        )}
      </ListGroup>
      <div className="blank-space"></div>
    </>
  );
}
