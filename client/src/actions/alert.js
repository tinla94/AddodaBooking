import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alerType, timeout = 5000) => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    // Remove alert after notifying user
    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), timeout)
}