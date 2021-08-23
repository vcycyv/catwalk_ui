import { authConstants } from "../constants";
import authService from "../services/authService";
import { history } from '../helpers'

export const authActions = {
    login,
}

function login(username, password, from) {
    return dispatch => {
        authService.login(username, password).then(
            data => {
                dispatch(success());
                history.push(from);
                return Promise.resolve();
            },
            error => {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                
                dispatch(failure(message));
                return Promise.reject();
            }
        );
    };

    function success() { return { type: authConstants.LOGIN_SUCCESS } };
    function failure(msg) { return { type: authConstants.LOGIN_FAILURE, payload: msg } };
};