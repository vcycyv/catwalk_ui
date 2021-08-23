import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar'
import { LoginPage } from './pages/LoginPage';

import "./App.css"

let App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <PrivateRoutes/>
            </Switch>
        </Router>
    )
}

let PrivateRoutes = () => {
    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content">
                hello<br/>
                hello<br/>
                hello<br/>
                hello<br/>
            </div>
        </div>
    )
}

export default App
