export interface ISocketEvent<T = unknown> {
    ok: boolean;
    data: T;
    code?: string;
}