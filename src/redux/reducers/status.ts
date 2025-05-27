import { StatusAction } from '@/redux/action';
import { IAction } from '@/redux/interfaces/action';

export const initial_state: boolean = false;

export function reducer(state: boolean, action: IAction): boolean {
  switch (action.type) {
    case StatusAction.REPLACE_ALL:
      return action.data as boolean;

    default:
      return state;
  }
}
