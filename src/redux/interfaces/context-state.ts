import React from "react";
import { IAction } from "./action";

export interface IContextState<T> {
    state: T;
    dispatch: React.Dispatch<IAction>;
}