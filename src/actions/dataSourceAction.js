import {dataSourceService} from "../services";
import { dataSourceConstants } from "../constants";

export const dataSourceActions = {
    getDataSources,
}

function getDataSources() {
    return dispatch => {
        dataSourceService.getDataSources().then(
            response => {
                dispatch(success(response.data))
            },
            error => {
                dispatch(failure(error.toString()))
            }
        )
    }
    function success(dataSources) { return { type: dataSourceConstants.GET_DATASOURCES_SUCCESS, data: dataSources } }
    function failure(errMsg) { return { type: dataSourceConstants.GET_DATASOURCES_FAILURE, data: errMsg } }
}