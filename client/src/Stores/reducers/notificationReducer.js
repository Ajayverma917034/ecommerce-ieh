import { ALERT_OPEN } from "../constants/notificationConstant";

export const AlertReducer = (state = { alert: { open: false, sevirity: 'success', message: '' } }, action) => {
    switch (action.type) {
        case ALERT_OPEN:
            return { alert: action.payload }
        default:
            return state
    }
}