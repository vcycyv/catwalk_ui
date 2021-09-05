import axios from 'axios';
import config from 'react-global-configuration';
import { authHeader } from './authService';

export const connectionService = {
    getConnections,
}

function getConnections() {
    return axios.get(config.get('apiUrl') + 'connections', {
        headers: authHeader(),
    })
}
