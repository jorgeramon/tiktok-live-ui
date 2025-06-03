import { useRequestCreated } from '@/events/input/request-created';
import { useRequestUpdated } from '@/events/input/request-updated';
import { IRequest } from '@/interfaces/request';
import { RequestsAction } from '@/redux/action';
import { IState } from '@/redux/interfaces/state';
import { initial_state, reducer } from '@/redux/reducers/requests';
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useLoaderData, useParams } from 'react-router';

type IRequestState = IState<IRequest[]> & {
  last_added: IRequest | null;
  last_updated: IRequest | null;
};

export const RequestsContext = createContext<IRequestState>({
  state: [],
  dispatch: () => {},
  last_added: null,
  last_updated: null,
});

export function RequestsProvider({ children }: PropsWithChildren) {
  const { requests } = useLoaderData() ?? { requests: null };
  const { account_id } = useParams();
  const [state, dispatch] = useReducer(reducer, initial_state);
  const [last_added, setLastAdded] = useState<IRequest | null>(null);
  const [last_updated, setLastUpdated] = useState<IRequest | null>(null);

  const request_created = useRequestCreated(account_id!);
  const request_updated = useRequestUpdated(account_id!);

  useEffect(() => {
    if (request_created !== null) {
      setLastAdded(request_created);
      dispatch({ type: RequestsAction.ADD, data: request_created });
    }
  }, [request_created]);

  useEffect(() => {
    if (request_updated !== null) {
      setLastUpdated(request_updated);
      dispatch({ type: RequestsAction.UPDATE_ONE, data: request_updated });
    }
  }, [request_updated]);

  useEffect(() => {
    if (typeof requests !== 'undefined' && requests !== null) {
      dispatch({ type: RequestsAction.REPLACE_ALL, data: requests });
    }
  }, [requests]);

  return (
    <RequestsContext.Provider
      value={{ state, dispatch, last_added, last_updated }}
    >
      {children}
    </RequestsContext.Provider>
  );
}
