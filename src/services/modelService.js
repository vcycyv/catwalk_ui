import axios from 'axios';

export const modelService = {
    buildModel,
}

function buildModel(modelRequest) {
    return axios.post('/models', modelRequest)
}