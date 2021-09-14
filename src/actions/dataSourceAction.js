import dataSourceService from "../services/dataSourceService";

export const dataSourceActions = {
    getDataSources,
}

function getDataSources() {
    return dispatch => {
        dataSourceService.getDataSources().then(
            response => {
                return Promise.resolve(response.data);//TODO dispatch action
            },
            error => {
                return Promise.reject(error);//TODO dispatch action
            }
        )
    }

}