export enum InputSocketEvent {
    GET_REQUESTS = '{account_id}.requests',
    GET_STATUS = '{account_id}.status',
    REQUEST_CREATED = '{account_id}.request',
    REQUEST_COMPLETED = '{account_id}.request.completed'
}

export enum OutputSocketEvent {
    GET_REQUESTS = 'get.requests',
    GET_STATUS = 'get.status',
    COMPLETE_REQUEST = 'complete.request'
}