import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Table, Modal, Button, Space } from 'antd';
import { connectionService } from '../services';
import ConnectionForm from '../components/ConnectionForm';
import _ from 'underscore';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function ConnectionsPage() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [connection, setConnection] = useState({
        'id': '',
        'type': '',
        'name': '',
        'host': '',
        'user': '',
        'password': '',
        'dbName': ''
    })
    const [formAction, setFormAction] = React.useState("add"); //"add" or "update"

    const [data, setData] = useState([])

    useEffect(() => {
        connectionService.getConnections()
            .then(
                response => {
                    if (response.status < 300) {
                        setData(response.data)
                    } else {
                        Modal.error({
                            title: 'Error',
                            content: (
                                <>
                                    It failed to get connections:
                                    <br />
                                    &nbsp;&nbsp;{response.data.message}
                                </>
                            )
                        })
                    }
                }
            )
    }, [])

    const onAddConnectionClick = () => {
        setFormAction("add");
        setConnection({});
        setModalVisible(true);
    };

    const addConnection = (connectionData) => {
        connectionService.createConnection(connectionData)
            .then(
                () => {
                    return connectionService.getConnections();
                }
            ).then(
                response => {
                    setData(response.data)
                    setModalVisible(false);
                }
            ).catch(
                (error) => {
                    console.log(error)
                    setModalVisible(false);
                }
            )
    };

    const updateConnection = (connectionData) => {
        connectionService.updateConnection(connectionData)
            .then(
                () => {
                    return connectionService.getConnections();
                }
            ).then(
                response => {
                    setData(response.data)
                    setModalVisible(false);
                }
            ).catch(
                (error) => {
                    console.log(error)
                    setModalVisible(false);
                }
            )
    }

    const handleCancel = () => {
        setModalVisible(false);
    };

    const onEditConnectionButtonClick = (id) => {
        setFormAction("update");
        setModalVisible(true);
        connectionService.getConnection(id)
            .then(
                response => {
                    let connection = _.pick(response.data, ['id', 'type', 'name', 'host', 'user', 'password', 'dbName'])
                    setConnection(connection);

                }
            )
    }

    const deleteConnection = (id) => {
        confirm({
            title: 'Do you want to delete this connection?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                connectionService.deleteConnection(id)
                    .then(
                        () => {
                            return connectionService.getConnections();
                        }
                    ).then(
                        response => {
                            setData(response.data)
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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => <Link to={`/dataSource/connections/${record.id}`}>{text}</Link>
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Host',
            dataIndex: 'host',
        },
        {
            title: 'DB Name',
            dataIndex: 'dbName',
        },
        {
            title: 'Action',
            render: (record) =>
                <Space size="middle">
                    <Button type="link" block key={record.id + "_edit"} onClick={() => onEditConnectionButtonClick(record.id)}>edit</Button> 
                    <Button type="link" block key={record.id + "_delete"} onClick={() => deleteConnection(record.id)}>delete</Button>
                </Space>
        },
    ]

    return (
        <div>
            <PageHeader title="Connections" extra={[
                <Button key="add" onClick={onAddConnectionClick}>Add Connection</Button>,
            ]} />
            <Table rowSelection={{ type: "checkbox" }} columns={columns} dataSource={data} rowKey="id" />
            <Modal
                title={formAction === "add" ? "Add Connection" : "Update Connection"}
                visible={modalVisible}
                okText="Add"
                footer={[
                    <Button form="connectionForm" key="cancel" htmlType="reset">
                        Cancel
                    </Button>,
                    <Button form="connectionForm" key="submit" htmlType="submit">
                        Submit
                    </Button>
                ]}
            >
                <ConnectionForm buttonLabel="Add" submitForm={formAction === "add" ? addConnection : updateConnection} cancelForm={handleCancel} connection={connection} />
            </Modal>
        </div>
    )
}

export default ConnectionsPage