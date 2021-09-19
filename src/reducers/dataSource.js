import { dataSourceConstants } from '../constants';

export default function dataSource(state = {items:[]}, action) {
    switch (action.type) {
        case dataSourceConstants.GET_DATASOURCES_SUCCESS:
            return {
                items: action.data,
                error: ""
            };
        case dataSourceConstants.GET_DATASOURCES_FAILURE:
            return {
                ...state,
                error: action.data
            };
        default:
            return state;
    }
}