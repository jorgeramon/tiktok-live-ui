import { IRequest } from '@/interfaces/request';
import { IState } from '@/redux/interfaces/state';
import { initial_state, reducer } from '@/redux/reducers/requests';
import { createContext, PropsWithChildren, useReducer } from 'react';

export const RequestsContext = createContext<IState<IRequest[]>>({
  state: [],
  dispatch: () => {},
});

export function RequestsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initial_state);

  return (
    <RequestsContext.Provider value={{ state, dispatch }}>
      {children}
    </RequestsContext.Provider>
  );
}
