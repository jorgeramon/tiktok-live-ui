import { IRequest } from '@/interfaces/request';
import { RequestsAction } from '@/redux/action';
import { IAction } from '@/redux/interfaces/action';

export const initial_state: IRequest[] = [];

export function reducer(state: IRequest[], action: IAction): IRequest[] {
  switch (action.type) {
    case RequestsAction.REPLACE:
      return action.data as IRequest[];

    case RequestsAction.ADD:
      return [...state, action.data as IRequest];

    case RequestsAction.UPDATE: {
      const { _id, request: new_request } = action.data as IRequest;
      const request: IRequest | undefined = state.find(
        (request) => request._id === _id
      );

      if (request) {
        request.request = new_request;
      }

      return [...state];
    }

    case RequestsAction.COMPLETE: {
      const { _id, completed_at } = action.data as IRequest;
      const request: IRequest | undefined = state.find(
        (request) => request._id === _id
      );

      if (request) {
        request.completed = true;
        request.completed_at = completed_at;
      }

      return [...state];
    }

    default:
      return state;
  }
}
