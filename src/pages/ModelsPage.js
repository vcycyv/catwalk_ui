import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, PageHeader, Modal, Table, Select, Cascader, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { modelService, dataSourceService } from '../services';
import { dataSourceActions } from '../actions';

const { confirm } = Modal;
const { Option } = Select;

export default function ModelsPage() {
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const [scoreData, setScoreData] = useState({})
    const [drawers, setDrawers] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const dataSources = useSelector(state => state.dataSource);

    useEffect(() => {
        dispatch(dataSourceActions.getDataSources());
    }, [dispatch]);

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

    const openScoreModal = () => {
        setModalVisible(true);
    }

    const onDataSourceChange = e => {
        if (Array.isArray(e) && e.length > 1) {
            console.log(`scoreInputTableId: ` + e[1])
            setScoreData({ ...scoreData, "scoreInputTableId": e[1] });
        }
    }

    const onDrawerChange = (value) => {
        console.log(`drawerId: ` + value)
        setScoreData({ ...scoreData, "drawerId": value });
    }

    const onScoreOutputChange = (e) => {
        console.log(`scoreOutputTableName: ` + e.target.value)
        setScoreData({ ...scoreData, "scoreOutputTableName": e.target.value })
    }

    const rowSelection = {
        onChange: (selectedRowKeys) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`)
        }
    }

    const handleScore = () => {
        console.log("handle score...")
    }

    const handleCancel = () => {
        setModalVisible(false);
    }

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

    const getDataCascader = dataSources => {
        let rtnVal = [];
        let drawers = [];
        if (dataSources.items !== undefined) {
            dataSources.items.forEach(dataSource => {
                if (!drawers.includes(dataSource.drawerName)) {
                    drawers.push(dataSource.drawerName);
                }
            });
            drawers.forEach(drawer => {
                let tables = []; //elements are in form of {value, label}
                dataSources.items.forEach(dataSource => {
                    if (dataSource.drawerName === drawer) {
                        let filteredTables = tables.filter(table => table.value === dataSource.id)
                        if (filteredTables.length === 0) {
                            tables.push({ "value": dataSource.id, "label": dataSource.name })
                        }
                    }
                });
                rtnVal.push({ "value": drawer, "label": drawer, "children": tables })
            })
        }
        return rtnVal;
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
            <PageHeader title="Models" extra={[
                <Button key="score" onClick={openScoreModal}>Score</Button>,
            ]} />
            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                rowKey="id" />
            {modalVisible ?
                <Modal
                    title={"Score"}
                    visible={modalVisible}
                    okText="Score"
                    onOk={handleScore}
                    onCancel={handleCancel}
                >
                    <Form
                        name="model"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        autoComplete="off" >
                        <Form.Item label="Score Input Table">
                            <Cascader options={getDataCascader(dataSources)} onChange={onDataSourceChange} />
                        </Form.Item>
                        <Form.Item label="Score Output Drawer">
                            <Select
                                placeholder="Select a drawer"
                                onChange={onDrawerChange}
                            >
                                {drawers.map(drawer => <Option value={drawer.id}>{drawer.name}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Score Output Name">
                            <Input name="name" onChange={onScoreOutputChange} />
                        </Form.Item>
                    </Form>
                </Modal>
                :
                null
            }
        </div>
    )
}
