import axios from 'axios';

export const folderService = {
    addFolder,
    editFolder,
    getFolders,
}

function addFolder(parentID, name) {
    return axios.post('/folders', {parentID, name})
}

function editFolder(id, name) {
    return axios.put('/folders/' + id, null, {params: {
        name,
    }})
}

function getFolders() {
    return axios.get('/folders')
}