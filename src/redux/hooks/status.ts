import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useGetStatus } from "../../events/input/get-status";
import { StatusAction } from "../action";
import { StatusContext } from "../contexts/status";

export function useStatus() {
    const { account_id } = useParams();
    const { state, dispatch } = useContext(StatusContext);

    const get_status = useGetStatus(account_id!);

    useEffect(() => {
        if (get_status !== null) {
            dispatch({ type: StatusAction.REPLACE, data: get_status.is_online });
        }
    }, [get_status]);

    return { state, dispatch }
}