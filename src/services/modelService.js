import axios from 'axios';

export const modelService = {
    buildModel,
    getModels,
    deleteModel,
}

function buildModel(modelRequest) {
    return axios.post('/models', modelRequest)
}

function getModels() {
    return axios.get('/models')
}

function deleteModel(id) {
    return axios.delete('/models/' + id)
}