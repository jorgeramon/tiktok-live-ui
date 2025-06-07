import { IRequest } from '@/interfaces/request';
import { useRequests } from '@/redux/hooks/requests';
import React, { useEffect, useRef } from 'react';
import { Image, ListGroup, Stack } from 'react-bootstrap';

function isElementVisible(el: HTMLElement) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

function scrollAnimation(
  request: IRequest | null,
  timeoutRef: React.RefObject<number | null>
) {
  if (request !== null) {
    const audio = document.getElementById('sound_effect') as HTMLAudioElement;

    if (audio != null) {
      audio.play();
    }

    const element = document.getElementById(request._id);

    if (element !== null && !isElementVisible(element)) {
      element.scrollIntoView({ behavior: 'smooth' });

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        window.scrollTo({ behavior: 'smooth', top: 0 });
        timeoutRef.current = null;
      }, 4000);
    }
  }
}

export default function () {
  const { state: requests, last_added, last_updated } = useRequests();
  const timeoutRef = useRef<number | null>(null);

  const $requests = requests
    .filter((request) => !request.completed)
    .sort(
      (r1, r2) =>
        new Date(r1.requested_at).getTime() -
        new Date(r2.requested_at).getTime()
    );

  useEffect(() => {
    scrollAnimation(last_added, timeoutRef);
  }, [last_added]);

  useEffect(() => {
    scrollAnimation(last_updated, timeoutRef);
  }, [last_updated]);

  return (
    <>
      <audio id="sound_effect">
        <source src="/new_request.mp3" type="audio/mp3" />
      </audio>
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
              className={`request ${
                last_added?._id === _id || last_updated?._id === _id
                  ? 'animation_highlight'
                  : ''
              }`}
            >
              <Stack direction="horizontal" gap={3}>
                <span className="request-index">{index + 1}.</span>
                <Image
                  className="user-picture"
                  src={user_picture}
                  roundedCircle
                />
                <Stack className="ms-3 justify-content-center">
                  <span className="user-nickname">{user_nickname}</span>
                  <span className="user-request">{request}</span>
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
