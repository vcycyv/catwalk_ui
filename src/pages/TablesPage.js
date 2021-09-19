import React, { useEffect } from 'react';
import { PageHeader, Table, Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { dataSourceActions } from '../actions';
import DrawerViewer from '../components/DrawerViewer';


function TablesPage() {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = React.useState(false);
    const dataSources = useSelector(state => state.dataSource);
    //console.log("dataSources: " + dataSources);

    useEffect(() => {
        dispatch(dataSourceActions.getDataSources());
    }, [dispatch]);

    function onListDrawers() {
        setModalVisible(true);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Creation Time',
            dataIndex: 'createdAt',
        },
    ]

    return (
        <div>
            <PageHeader title="Data Sources" extra={[
                <Button onClick={onListDrawers}  icon={<UploadOutlined />}>Upload CSV</Button>
            ]} />
            {/* {dataSources.items.map((item) => {return item.id.toString()})} */}
            <Table columns={columns} dataSource={dataSources.items} rowKey="id" />
            <Modal
                title="upload csv file"
                visible={modalVisible}
            >
                <DrawerViewer/>
            </Modal>
        </div>
    )
}

export default TablesPage