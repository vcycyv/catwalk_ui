import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import 'antd/dist/antd.css';
import './DataSourcePage.css';
import { HiOutlineTable } from "react-icons/hi";
import { BiData } from "react-icons/bi";

function DataSourcePage() {
    let location = useLocation().pathname
    if (location === ''){
        location = 'tables'
    }else{
        let index = location.lastIndexOf("/"); 
        location  = location.substring(index + 1, location.length);
    }
    const [current, setCurrent] = useState(location);

    useEffect(() => {
       setCurrent(location);
    }, [location])

    function handleClick(e) {
        setCurrent(e.key);
    }

    return (
        <div id="second-menu">
            <Menu onClick={handleClick} selectedKeys={[current]}>
                <Menu.Item key='tables' icon={<HiOutlineTable />} className="horizontal-menu">
                    <Link to='/dataSource/tables'>tables</Link>
                </Menu.Item>
                <Menu.Item key='connections' active={location.startsWith('/dataSource/connections').toString()} icon={<BiData />} className="horizontal-menu">
                    <Link to='/dataSource/connections'>connections</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export { DataSourcePage }