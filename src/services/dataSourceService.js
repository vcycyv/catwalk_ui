import axios from 'axios';
import config from 'react-global-configuration';
import { authHeader } from './authService';

const dataSourceService = {
    getDataSources,
}

export default dataSourceService;

function getDataSources() {
    return axios.get(config.get('apiUrl') + 'dataSources', {
        headers: authHeader(),
    })
}

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         return handleResponseInternal(response, data);
//     });
// }