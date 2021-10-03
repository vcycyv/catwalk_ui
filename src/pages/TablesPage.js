import React, { useEffect } from 'react';
import { PageHeader, Table, Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { dataSourceActions } from '../actions';
import { dataSourceService } from '../services/dataSourceService';
import AddCSVToDrawerForm from '../components/AddCSVToDrawerForm';


const { confirm } = Modal;

function TablesPage() {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = React.useState(false);
    const dataSources = useSelector(state => state.dataSource);

    useEffect(() => {
        dispatch(dataSourceActions.getDataSources());
    }, [dispatch]);

    function onListDrawers() {
        setModalVisible(true);
    }

    function addCSV(drawerID, drawerName, file) {
        const data = new FormData();
        data.append("file", file)
        if (drawerID === "newDrawer") {
            dataSourceService.createDrawer(drawerName)
                .then(
                    response => {
                        let newDrawerID = response.data.id;
                        data.append("drawerId", newDrawerID);
                        addDataSource(data);
                    }
                )
        } else {
            data.append("drawerId", drawerID);
            addDataSource(data);
        }
    }

    const addDataSource = (data) => {
        dataSourceService.addDataSource(data)
            .then(
                () => {
                    dispatch(dataSourceActions.getDataSources())
                }
            )

        setModalVisible(false);
    }

    const deleteDataSource = (id) => {
        confirm({
            title: 'Do you want to delete this data source?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                dataSourceService.deleteDataSource(id)
                    .then(
                        () => {
                            dispatch(dataSourceActions.getDataSources())
                        }
                    ).catch(
                        (error) => {
                            console.log(error)
                        }
                    )
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const handleCancel = () => {
        setModalVisible(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Drawer',
            dataIndex: 'drawerName',
            sorter: (a, b) => a.drawerName.localeCompare(b.drawerName),
        },
        {
            title: 'Creation Time',
            dataIndex: 'createdAt',
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
        },
        {
            title: 'Action',
            render: (record) =>
                <Button type="link" block key={record.id + "_delete"} onClick={() => deleteDataSource(record.id)}>delete</Button>
        },
    ]

    const getDataSrouces = () => {
        if (dataSources.items === undefined) {
            console.log("dataSources.items is undefined.")
            return [];
        } else {
            console.log("is dataSources.items an array: " + Array.isArray(dataSources.items))
            if (Array.isArray(dataSources.items)) {
                return dataSources.items;
            } else {
                return [];
            }
        }
    }

    return (
        <div>
            <PageHeader title="Data Sources" extra={[
                <Button key="openForm" onClick={onListDrawers} icon={<UploadOutlined />}>Upload CSV</Button>
            ]} />
            {/* {dataSources.items.map((item) => {return item.id.toString()})} */}
            <Table columns={columns} dataSource={getDataSrouces()} rowKey="id" />
            {
                (modalVisible) ?
                    <Modal
                        title="upload csv file"
                        visible={modalVisible}
                        onCancel={handleCancel}
                        footer={[
                            <Button form="AddDataSourceForm" key="cancel" htmlType="reset">
                                Cancel
                            </Button>,
                            <Button form="AddDataSourceForm" key="submit" htmlType="submit">
                                Submit
                            </Button>
                        ]}
                    >
                        <AddCSVToDrawerForm submitForm={addCSV} cancelForm={handleCancel} />
                    </Modal>
                    :
                    null}
        </div>
    )
}

export default TablesPage