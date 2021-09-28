import axios from 'axios';

export const dataSourceService = {
    getDataSources,
    addDataSource,
    deleteDataSource,
    convertToDataSource,
    getDrawers,
    createDrawer,
}

function getDataSources() {
    return axios.get('/dataSources')
}

//data argument is form data
function addDataSource(data) {
    return axios.post('/dataSources', data)
}

function convertToDataSource(connectionID, table, drawerID) {
    return axios.post(`/connections/${connectionID}/tables/${table}/csv`, null, { params: {"drawerId": drawerID}})
}

function deleteDataSource(id) {
    return axios.delete('/dataSources/' + id)
}

function getDrawers() {
    return axios.get('/drawers')
}

function createDrawer(drawer) {
    return axios.post('/drawers', {"name": drawer})
}
