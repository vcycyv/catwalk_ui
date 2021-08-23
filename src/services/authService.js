import axios from 'axios';
import config from 'react-global-configuration';

const authService = {
    login,
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