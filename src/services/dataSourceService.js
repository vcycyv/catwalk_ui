import axios from 'axios';

export const dataSourceService = {
    getDataSources,
    getDrawers,
    createDrawer,
}

function getDataSources() {
    return axios.get('/dataSources')
}

function getDrawers() {
    return axios.get('/drawers')
}

function createDrawer(drawer) {
    return axios.post('/drawers', drawer)
}