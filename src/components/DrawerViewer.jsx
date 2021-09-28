import React, { useEffect } from 'react';
import { Modal, Radio, Input, Space } from 'antd';
import { dataSourceService } from '../services';

const DrawerViewer = ({onDrawerRadioChange, onDrawerInputChange}) => {
    const [drawers, setDrawers] = React.useState([]);
    const [radioValue, setRadioValue] = React.useState([]);

    useEffect(() => {
        dataSourceService.getDrawers()
            .then(
                response => {
                    if (response.status < 300) {
                        setDrawers(response.data)
                    } else {
                        Modal.error({
                            title: 'Error',
                            content: (
                                <>
                                    It failed to get drawers:
                                    <br />
                                    &nbsp;&nbsp;{response.data.message}
                                </>
                            )
                        })
                    }
                }
            )
    }, [])

    return (
        <div>
            {/* {drawers.map(drawer => drawer.name)} */}
            <Radio.Group onChange={e => {onDrawerRadioChange(e); setRadioValue(e.target.value)}} value={radioValue} >
                <Space direction="vertical">
                    {drawers.map(drawer => <Radio key={drawer.id} value={drawer.id}>{drawer.name}</Radio>)}
                    <Radio key="newDrawer" value="newDrawer">
                        new drawer...
                        {radioValue === "newDrawer" ? <Input id="newDrawerInput" onChange={onDrawerInputChange} style={{ width: 100, marginLeft: 10 }} /> : null}
                    </Radio>
                </Space>
            </Radio.Group>
        </div>
    )
}

export default DrawerViewer