import dataSourceService from "../services/dataSourceService";

export const dataSourceActions = {
    getDataSources,
}

function getDataSources(){
    return dispatch => {
        dataSourceService.getDataSources().then(
            data => {
                return Promise.resolve();
            },
            error => {
                return Promise.reject();
            }
        )
    }
    
}