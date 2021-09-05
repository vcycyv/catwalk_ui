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

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
                <Menu.SubMenu key="sub1" icon={<AiOutlineTable />} title="Data Source">
                    <Menu.Item key="tables">
                        <Link to='/dataSource/tables'>
                            tables
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="connections">
                        <Link to='/dataSource/connections'>
                            connections
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="models" icon={<AiOutlineLineChart />}>
                    <Link to='/models'>
                        Models
                    </Link>
                </Menu.Item>
                <Menu.Item key="servers" icon={<AiOutlineCloudServer />}>
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