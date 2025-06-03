import { RequestsContext } from '@/redux/contexts/requests';
import { useContext } from 'react';

export function useRequests() {
  const { state, dispatch, last_added, last_updated } =
    useContext(RequestsContext);

  return { state, dispatch, last_added, last_updated };
}
