import axios from 'axios';

export const modelService = {
    buildModel,
    score,
    getModels,
    deleteModel,
}

function buildModel(modelRequest) {
    return axios.post('/models', modelRequest)
}

/*
scoreRequest example:
{
    "scoreInputTableId",
    "drawerId",
    "scoreOutputTableName"
}
*/
function score(id, scoreRequest) {
    return axios.post('/models' + id + '/score', scoreRequest)
}

function getModels() {
    return axios.get('/models')
}

function deleteModel(id) {
    return axios.delete('/models/' + id)
}