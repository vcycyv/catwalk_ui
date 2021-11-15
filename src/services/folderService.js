import axios from 'axios';

export const folderService = {
    getFolders,
    addFolder,
    editFolder,
    deleteFolder,
}

function getFolders() {
    return axios.get('/folders')
}

function addFolder(parentID, name) {
    return axios.post('/folders', {parentID, name})
}

function editFolder(id, name) {
    return axios.put('/folders/' + id, null, {params: {
        name,
    }})
}

function deleteFolder(id) {
    return axios.delete('/folders/' + id)
}