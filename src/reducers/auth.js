import { authConstants } from '../constants';

const token = JSON.parse(localStorage.getItem("token"));

const initialState = token ? { loggedIn: true } : {};

export default function auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case authConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                loggingIn: false,
                loggedIn: true,
            };
        case authConstants.LOGIN_FAILURE:
            return {
                loggingIn: false,
                loggedIn: false,
                message: payload,
            };
        default:
            return state;
    }
}