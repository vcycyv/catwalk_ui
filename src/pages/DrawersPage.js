import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Table, Modal, Form, Input, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import _ from 'underscore';

import { dataSourceService } from '../services';

const { confirm } = Modal;

function DrawersPage() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [data, setData] = useState([])
    const [formAction, setFormAction] = React.useState("add"); //"add" or "update"
    const [drawer, setDrawer] = useState({ 'id': '', 'name': '' })
    const [form] = Form.useForm();

    useEffect(() => {
        dataSourceService.getDrawers()
            .then(
                response => {
                    if (response.status < 300) {
                        setData(response.data)
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

    useEffect(() => {
        form.setFieldsValue({
            drawer
        });
        form.resetFields();
    }, [form, drawer]);

    const onAddDrawerClick = () => {
        setFormAction("add");
        setDrawer({});
        setModalVisible(true);
    };

    const onEditDrawerButtonClick = (id) => {
        setFormAction("update");
        setModalVisible(true);
        form.resetFields();
        dataSourceService.getDrawer(id)
            .then(
                response => {
                    let drawer = _.pick(response.data, ['id', 'name'])
                    setDrawer(drawer);
                }
            )
    }

    const deleteDrawer = (id) => {
        confirm({
            title: 'Do you want to delete this drawer?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                dataSourceService.deleteDrawer(id)
                    .then(
                        () => {
                            return dataSourceService.getDrawers();
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

    const onFinish = () => {
        let actionPromise;
        if (formAction === "add") {
            actionPromise = dataSourceService.createDrawer(form.getFieldValue("name"))

        } else if (formAction === "update") {
            actionPromise = dataSourceService.updateDrawer(form.getFieldsValue())
        }

        actionPromise.then(
            () => {
                return dataSourceService.getDrawers();
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

    const onCancel = () => {
        //setDrawer({id: '', name: ''});
        //form.initialValues = {id: '', name: ''};
        //form.resetFields();
        setModalVisible(false);
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
        {
            title: 'Created By',
            dataIndex: 'user',
        },
        {
            title: 'Action',
            render: (record) =>
                <Space size="middle">
                    <Button type="link" block key={record.id + "_edit"} onClick={() => onEditDrawerButtonClick(record.id)}>edit</Button>
                    <Button type="link" block key={record.id + "_delete"} onClick={() => deleteDrawer(record.id)}>delete</Button>
                </Space>
        },
    ]

    return (
        <div>
            <PageHeader title="Drawers" extra={[
                <Button key="add" onClick={onAddDrawerClick}>Add Drawer</Button>,
            ]} />
            <Table rowSelection={{ type: "checkbox" }} columns={columns} dataSource={data} rowKey="id" />
            <Modal
                title={formAction === "add" ? "Add Drawer" : "Update Drawer"}
                visible={modalVisible}
                okText="Add"
                footer={[
                    <Button form="drawerForm" key="cancel" htmlType="reset">
                        Cancel
                    </Button>,
                    <Button form="drawerForm" key="submit" htmlType="submit">
                        Submit
                    </Button>
                ]}
            >
                <Form
                    name="drawerForm"
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={drawer}
                    onFinish={onFinish}
                    onReset={onCancel}
                    autoComplete="off"
                >
                    <Form.Item name="id" label="id" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input drawer name' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default DrawersPage