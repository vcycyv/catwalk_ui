import axios from 'axios';

const dataSourceService = {
    getDataSources,
}

export default dataSourceService;

function getDataSources() {
    return axios.get('/dataSources')
}

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         return handleResponseInternal(response, data);
//     });
// }