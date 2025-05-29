import { RequestsContext } from '@/redux/contexts/requests';
import { useContext } from 'react';

export function useRequests() {
  const { state, dispatch } = useContext(RequestsContext);

  return { state, dispatch };
}
