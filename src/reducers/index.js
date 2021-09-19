import { combineReducers } from 'redux'

import auth from "./auth"
import dataSource from './dataSource'

const rootReducer = combineReducers({
    auth,
    dataSource
})

export default rootReducer