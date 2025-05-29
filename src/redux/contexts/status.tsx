import { useStatusUpdated } from '@/events/input/status-updated';
import { IState } from '@/redux/interfaces/state';
import { initial_state, reducer } from '@/redux/reducers/status';
import { createContext, PropsWithChildren, useEffect, useReducer } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { StatusAction } from '../action';

export const StatusContext = createContext<IState<boolean>>({
  state: false,
  dispatch: () => {},
});

export function StatusProvider({ children }: PropsWithChildren) {
  const { status } = useLoaderData() ?? { status: null };
  const { account_id } = useParams();
  const [state, dispatch] = useReducer(reducer, initial_state);

  const new_status = useStatusUpdated(account_id!);

  useEffect(() => {
    dispatch({ type: StatusAction.REPLACE_ALL, data: new_status });
  }, [new_status]);

  useEffect(() => {
    if (typeof status !== 'undefined' && status !== null) {
      dispatch({ type: StatusAction.REPLACE_ALL, data: status });
    }
  }, [status]);

  return (
    <StatusContext.Provider value={{ state, dispatch }}>
      {children}
    </StatusContext.Provider>
  );
}
