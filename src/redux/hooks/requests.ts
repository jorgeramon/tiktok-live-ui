import { useRequestCompleted } from '@/events/input/request-completed';
import { useRequestCreated } from '@/events/input/request-created';
import { useRequestUpdated } from '@/events/input/request-updated';
import { RequestsAction } from '@/redux/action';
import { RequestsContext } from '@/redux/contexts/requests';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router';

export function useRequests() {
  const { account_id } = useParams();
  const { state, dispatch } = useContext(RequestsContext);

  const request_created = useRequestCreated(account_id!);
  const request_updated = useRequestUpdated(account_id!);
  const request_completed = useRequestCompleted(account_id!);

  useEffect(() => {
    if (request_created !== null) {
      dispatch({ type: RequestsAction.ADD, data: request_created });
    }
  }, [request_created]);

  useEffect(() => {
    if (request_updated !== null) {
      dispatch({ type: RequestsAction.UPDATE, data: request_updated });
    }
  }, [request_updated]);

  useEffect(() => {
    if (request_completed !== null) {
      dispatch({ type: RequestsAction.COMPLETE, data: request_completed });
    }
  }, [request_completed]);

  return { state, dispatch };
}
