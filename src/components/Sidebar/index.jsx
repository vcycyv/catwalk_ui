import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AiOutlineTable, AiOutlineLineChart, AiOutlineCloudServer, AiOutlineLogout } from "react-icons/ai";

import 'antd/dist/antd.css';
import './index.css';


const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    const getSelectedKey = (path) => {
        if (path.startsWith("/dataSource/connections")) {
            return "/dataSource/connections"
        } else {
            return path
        }
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultOpenKeys={['dataSource']} mode="inline" defaultSelectedKeys={["/dataSource/tables"]} selectedKeys={[getSelectedKey(window.location.pathname)]}>
                <Menu.SubMenu key="dataSource" icon={<AiOutlineTable />} title="Data Source">
                    <Menu.Item key="/dataSource/tables" >
                        <Link to='/dataSource/tables'>
                            tables
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/dataSource/drawers" >
                        <Link to='/dataSource/drawers'>
                            drawers
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/dataSource/connections">
                        <Link to='/dataSource/connections'>
                            connections
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="models" icon={<AiOutlineLineChart />} title="Models">
                    <Menu.Item key="/models/builder" >
                        <Link to='/models/builder'>
                            builder
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/models/models" >
                        <Link to='/models/models'>
                            models
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="/servers" icon={<AiOutlineCloudServer />}>
                    <Link to='/servers'>
                        Servers
                    </Link>
                </Menu.Item>
                <Menu.Item key="login" icon={<AiOutlineLogout />} style={{ paddingTop: '30px', boxSizing: 'content-box', }}>
                    <Link to='/login'>
                        Logout
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;