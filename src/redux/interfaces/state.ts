import { IAction } from '@/redux/interfaces/action';
import React from 'react';

export interface IState<T> {
  state: T;
  dispatch: React.Dispatch<IAction>;
}
