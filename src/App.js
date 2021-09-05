import React from 'react'
import { Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'typeface-open-sans'
//import Sidebar from './components/Sidebar/Sidebar';
import Sidebar from './components/Sidebar';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from './pages/LoginPage';
import { TablesPage } from './pages/TablesPage';
import { ConnectionsPage } from './pages/ConnectionsPage';
import { ModelsPage } from './pages/ModelsPage';
import { ServersPage } from './pages/ServersPage';
import { history } from './helpers';


import './App.css';

const { Header, Content } = Layout;

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
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout className="site-layout">
                <Header className="ant-layout-sider-dark" style={{ padding: 0 }} >
                    <h1 style={{textAlign: 'center', color: 'white', fontFamily: 'open sans', fontSize: '32px', fontWeight: 800 }}>Open BI Toolkit</h1>
                </Header>
                <Content>
                    <PrivateRoute exact path="/dataSource/tables" component={TablesPage} />
                    <PrivateRoute exact path="/dataSource/connections" component={ConnectionsPage} />
                    <PrivateRoute exact path="/models" component={ModelsPage} />
                    <PrivateRoute exact path="/servers" component={ServersPage} />
                </Content>
            </Layout>
        </Layout>
    )
}

export default App
