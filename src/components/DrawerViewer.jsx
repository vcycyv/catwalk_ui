import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { dataSourceService } from '../services';

const DrawerViewer = () => {
    const [drawers, setdrawers] = React.useState([]);

    useEffect(() => {
        dataSourceService.getDrawers()
            .then(
                response => {
                    if (response.status < 300) {
                        setdrawers(response.data)
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
            {drawers.map(drawer => drawer.name)}
        </div>
    )
}

export default DrawerViewer