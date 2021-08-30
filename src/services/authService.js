import axios from 'axios';
import config from 'react-global-configuration';
import { history } from '../helpers';

const authService = {
    login,
    logout,
}

export default authService;

function login(username, password) {
    return axios.post(config.get('apiUrl') + 'auth', { username, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
            }
            return;
        })
}

function logout() {
    localStorage.removeItem('token');
    history.push('/login');
}

export function authHeader() {
    // return authorization header with jwt token
    let token = localStorage.getItem('token');

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}