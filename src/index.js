import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import config from 'react-global-configuration'
import axios from 'axios';

import rootReducer from './reducers'
import { history } from './helpers';
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';

config.set({ apiUrl: 'http://localhost:8000/' });

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        history.push('/login')
    }
    return error;
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
