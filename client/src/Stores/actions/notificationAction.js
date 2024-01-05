import { ALERT_OPEN } from "../constants/notificationConstant";

export const alertOption = (error) => (dispatch) => {
    dispatch({ type: ALERT_OPEN, payload: error });
}