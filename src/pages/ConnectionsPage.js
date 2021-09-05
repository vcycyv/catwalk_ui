import React, { useState, useEffect } from 'react';
import { PageHeader, Button } from 'antd'
import { connectionService } from '../services'

function ConnectionsPage() {
    const [fields, setFields] = useState({
        'id': '',
        'Type': '',
        'Name': '',
        'Host': '',
        'User': '',
        'Password': '',
        'DbName': ''
    })

    useEffect(() => {
        connectionService.getConnections()
    })

    return (
        <div>
            <PageHeader title="Connections" extra={[
                <Button key="btn_1">Add Connection</Button>,
            ]} />
        </div>
    )
}



export { ConnectionsPage }