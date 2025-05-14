import { createContext, PropsWithChildren, useReducer } from "react";
import { IContextState } from "../interfaces/context-state";
import { initial_state, reducer } from "../reducers/status";

export const StatusContext = createContext<IContextState<boolean>>({
    state: false,
    dispatch: () => { }
});

export function RequestsProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, initial_state);

    return (
        <StatusContext.Provider value={{ state, dispatch }}>
            {children}
        </StatusContext.Provider>
    );
}