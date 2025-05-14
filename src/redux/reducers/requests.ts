import { IRequest } from "../../interfaces/request";
import { RequestsAction } from "../action";
import { IAction } from "../interfaces/action";

export const initial_state: IRequest[] = [];

export function reducer(state: IRequest[], action: IAction): IRequest[] {
    switch (action.type) {

        case RequestsAction.REPLACE:
            return action.data as IRequest[];

        case RequestsAction.ADD:
            return [...state, action.data as IRequest];

        case RequestsAction.UPDATE:
            {
                const { request_id, new_request } = action.data as any;
                const request: IRequest | undefined = state.find(request => request._id === request_id);

                if (request) {
                    request.request = new_request;
                }

                return [...state];
            }

        case RequestsAction.COMPLETE:
            {
                const request_id = action.data as string;
                const request: IRequest | undefined = state.find(request => request._id === request_id);

                if (request) {
                    request.completed = true;
                }

                return [...state];
            }

        default:
            return state;
    }
}
