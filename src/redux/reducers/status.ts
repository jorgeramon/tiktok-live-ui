import { RequestsAction } from "../action";
import { IAction } from "../interfaces/action";

export const initial_state: boolean = false;

export function reducer(state: boolean, action: IAction): boolean {
    switch (action.type) {

        case RequestsAction.REPLACE:
            return action.data as boolean;

        default:
            return state;
    }
}
