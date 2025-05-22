import { StatusContext } from '@/redux/contexts/status';
import { useContext } from 'react';

export function useStatus() {
  const { state, dispatch } = useContext(StatusContext);

  return { state, dispatch };
}
