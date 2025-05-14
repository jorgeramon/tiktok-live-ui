import { createContext, PropsWithChildren, useReducer } from "react";
import { IRequest } from "../../interfaces/request";
import { IContextState } from "../interfaces/context-state";
import { initial_state, reducer } from "../reducers/requests";

export const RequestsContext = createContext<IContextState<IRequest[]>>({
    state: [],
    dispatch: () => { }
});

export function RequestsProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, initial_state);

    return (
        <RequestsContext.Provider value={{ state, dispatch }}>
            {children}
        </RequestsContext.Provider>
    );
}