import React, { useState, useEffect } from 'react'
import { PageHeader, Modal, Table, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { modelService } from '../services';

const { confirm } = Modal;

export default function ModelsPage() {
    const [data, setData] = useState([])
    useEffect(() => {
        modelService.getModels()
            .then(
                response => {
                    if (response.status < 300) {
                        setData(response.data)
                    } else {
                        Modal.error({
                            title: 'Error',
                            content: (
                                <>
                                    It failed to get models:
                                    <br />
                                    &nbsp;&nbsp;{response.data.message}
                                </>
                            )
                        })
                    }
                }
            )
    }, [])

    const deleteModel = (id) => {
        confirm({
            title: 'Do you want to delete this model?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                modelService.deleteModel(id)
                    .then(
                        () => {
                            return modelService.getModels();
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
            render: (text, record) =>
                <Button type="link" block key={record.id} >{text}</Button>
        },
        {
            title: 'Creation Time',
            dataIndex: 'createdAt',
        },
        {
            title: 'Function',
            dataIndex: 'function',
        },
        {
            title: 'Algorithm',
            dataIndex: 'algorithm',
        },
        {
            title: 'Action',
            render: (record) =>
                <Space size="middle">
                    <Button type="link" block key={record.id + "_edit"} >edit</Button>
                    <Button type="link" block key={record.id + "_delete"} onClick={() => deleteModel(record.id)}>delete</Button>
                </Space>
        },
    ]

    return (
        <div>
            <PageHeader title="Models" />
            <Table rowSelection={{ type: "checkbox" }} columns={columns} dataSource={data} rowKey="id" />
        </div>
    )
}
