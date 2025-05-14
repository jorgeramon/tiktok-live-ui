import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useGetRequests } from "../../events/input/get-requests";
import { useRequestCompleted } from "../../events/input/request-completed";
import { useRequestCreated } from "../../events/input/request-created";
import { useRequestUpdated } from "../../events/input/request-updated";
import { RequestsAction } from "../action";
import { RequestsContext } from "../contexts/requests";

export function useRequests() {
    const { account_id } = useParams();
    const { state, dispatch } = useContext(RequestsContext);

    const get_requests = useGetRequests(account_id!);
    const request_created = useRequestCreated(account_id!);
    const request_updated = useRequestUpdated(account_id!);
    const request_completed = useRequestCompleted(account_id!);

    useEffect(() => {
        if (get_requests) {
            dispatch({ type: RequestsAction.REPLACE, data: get_requests });
        }
    }, [get_requests]);

    useEffect(() => {
        if (request_created) {
            dispatch({ type: RequestsAction.ADD, data: request_created });
        }
    }, [request_created]);

    useEffect(() => {
        if (request_updated) {
            dispatch({ type: RequestsAction.UPDATE, data: request_updated });
        }
    }, [request_updated]);

    useEffect(() => {
        if (request_completed) {
            dispatch({ type: RequestsAction.COMPLETE, data: request_completed });
        }
    }, [request_completed]);

    return { state, dispatch }
}