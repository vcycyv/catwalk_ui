import React from 'react'
import { Router, Switch, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar'
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from './pages/LoginPage';
import { DataSourcePage } from './pages/DataSourcePage';
import {TablesPage} from './pages/TablesPage';
import {ConnectionsPage} from './pages/ConnectionsPage';
import { ModelsPage } from './pages/ModelsPage';
import { ServersPage } from './pages/ServersPage';
import { history } from './helpers';

import "./App.css"

let App = () => {
    return (
        <Router history={history} >
            {/* <Redirect strict from="/dataSource" to="/dataSource/tables" /> */}
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <PrivateRoutes />
            </Switch>
        </Router>
    )
}

let PrivateRoutes = () => {
    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content">
                <PrivateRoute path="/dataSource" component={DataSourcePage} />
                <PrivateRoute exact path="/dataSource/tables" component={TablesPage} />
                <PrivateRoute exact path="/dataSource/connections" component={ConnectionsPage} />
                <PrivateRoute exact path="/models" component={ModelsPage} />
                <PrivateRoute exact path="/servers" component={ServersPage} />
            </div>
        </div>
    )
}

export default App
