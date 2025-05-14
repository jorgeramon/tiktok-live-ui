import { useGetStatus } from '@/events/input/get-status';
import { StatusAction } from '@/redux/action';
import { StatusContext } from '@/redux/contexts/status';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router';

export function useStatus() {
  const { account_id } = useParams();
  const { state, dispatch } = useContext(StatusContext);

  const get_status = useGetStatus(account_id!);

  useEffect(() => {
    if (get_status !== null) {
      dispatch({ type: StatusAction.REPLACE, data: get_status.is_online });
    }
  }, [get_status]);

  return { state, dispatch };
}
