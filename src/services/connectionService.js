import axios from 'axios';

export const connectionService = {
    getConnections,
    getConnection,
    createConnection,
    updateConnection,
    deleteConnection,
}

function getConnections() {
    return axios.get('/connections')
}

function getConnection(id) {
    return axios.get('/connections/' + id)
}

function createConnection(connection) {
    return axios.post('/connections', connection)
}

function updateConnection(connection) {
    return axios.put('/connections/' + connection.id, connection)
}

function deleteConnection(id) {
    return axios.delete('/connections/' + id)
}
