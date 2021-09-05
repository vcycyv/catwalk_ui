import dataSourceService from "../services/dataSourceService";

export const dataSourceActions = {
    getDataSources,
}

function getDataSources(){
    return dispatch => {
        dataSourceService.getDataSources().then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        )
    }
    
}