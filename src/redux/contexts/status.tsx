import { IState } from '@/redux/interfaces/state';
import { initial_state, reducer } from '@/redux/reducers/status';
import { createContext, PropsWithChildren, useReducer } from 'react';

export const StatusContext = createContext<IState<boolean>>({
  state: false,
  dispatch: () => {},
});

export function StatusProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initial_state);

  return (
    <StatusContext.Provider value={{ state, dispatch }}>
      {children}
    </StatusContext.Provider>
  );
}
