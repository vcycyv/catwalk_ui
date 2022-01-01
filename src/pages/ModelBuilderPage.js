import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Row, Col, Steps, Form, Modal, Table, Input, Checkbox, Button, Select, Cascader } from 'antd';

import { dataSourceActions } from '../actions';
import { dataSourceService } from '../services/dataSourceService';
import { modelService } from '../services/modelService';
import { FolderView } from "../components/FolderView"
import { getDataCascader } from './common';

const { Step } = Steps;

export default function ModelBuilderPage() {
    const dispatch = useDispatch();
    const [data, setData] = useState({}) //form data
    const [current, setCurrent] = useState(0);
    const [columns, setColumns] = useState([]);
    const [location, setLocation] = useState({"path": "", "id":""});
    const [folderViewVisible, setFolderViewVisible] = useState(false)

    const dataSources = useSelector(state => state.dataSource);

    useEffect(() => {
        dispatch(dataSourceActions.getDataSources());
    }, [dispatch]);

    const buildModel = () => {
        let modelRequest = {...data};
        let inputVars = columns.filter(column => { return column.inputVar === true }).map(column => {return column.column});
        modelRequest["predictors"] = inputVars;
        let targetVars = columns.filter(column => { return column.targetVar === true });
        if (targetVars.length === 1) {
            modelRequest["target"] = targetVars[0]["column"];
        }
        modelService.buildModel(modelRequest);
    }

    const functions = [
        { "label": "classification", "value": "classification" },
        { "label": "prediction", "value": "prediction" },
        { "label": "data analysis", "value": "data analysis" },
    ];

    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log("onchange: " + e.target.name + " " + e.target.value)
    }

    const openFolderModal = () => {
        setFolderViewVisible(true);
    }

    const handleFolderSelection = (location) => {
        setLocation(location);
        setData({
            ...data,
            "folderId": location.id
        })
        setFolderViewVisible(false);
    } 

    //================= step 1 =================
    const onChange = current => {
        console.log('onChange:', current);
        setCurrent(current);
    }

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    //================= step 2 =================
    const onDataSourceChange = e => {
        setData({ ...data, "trainTableCascaderMeta": e });
        if (Array.isArray(e) && e.length > 1) {
            let dataSourceId = e[1];
            setData({ ...data, "trainTable": dataSourceId, "trainTableCascaderMeta": e });
            dataSourceService.getDataColumns(dataSourceId)
                .then(
                    response => {
                        if (response.status < 300) {
                            setColumns(response.data.map((column, i) => { return {"key":i, "column": column, "inputVar": true, "targetVar": false } }))
                        } else {
                            Modal.error({
                                title: 'Error',
                                content: (
                                    <>
                                        It failed to get data source columns:
                                        <br />
                                        &nbsp;&nbsp;{response.data.message}
                                    </>
                                )
                            })
                        }
                    }
                )
        } else {
            setColumns([]);
        }
    }

    const onInputVarCheckboxChange = e => {
        const target = e.target;
        const varName = target.name.slice(0, 0 - "-input".length); //remove the ending "-input"

        let newColumns = [...columns]
        let targetColumn = newColumns.filter(column => { return column.column === varName })[0]
        targetColumn["inputVar"] = !targetColumn["inputVar"]
        if (target.checked) {
            targetColumn["targetVar"] = false;
        }
        setColumns(newColumns);
    }

    const onTargetVarCheckboxChange = e => {
        const target = e.target;
        const varName = target.name.slice(0, 0 - "-target".length); //remove the ending "-target"

        let newColumns = [...columns]
        let targetColumn = newColumns.filter(column => { return column.column === varName })[0]
        targetColumn["targetVar"] = !targetColumn["targetVar"]
        if (target.checked) {
            targetColumn["inputVar"] = false;
            newColumns.forEach(column => {
                if (column.column !== targetColumn.column) {
                    column.targetVar = false;
                }
            })
        }
        setColumns(newColumns);
    }

    const metaColumns = [
        {
            title: 'Column',
            dataIndex: 'column',
            key: 'column',
        },
        {
            title: 'Input Variable',
            dataIndex: 'inputVar',
            key: 'inputVar',
            render: (_, record) => (
                <Checkbox name={record.column + "-input"} checked={record.inputVar} onChange={onInputVarCheckboxChange} />
            ),
        },
        {
            title: 'Target Variable',
            dataIndex: 'targetVar',
            key: 'targetVar',
            render: (_, record) => (
                <Checkbox name={record.column + "-target"} checked={record.targetVar} onChange={onTargetVarCheckboxChange} />
            ),
        },
    ];

    const steps = [
        {
            title: 'Set Properties',
            content: <Form
                name="model"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                style={{ marginTop: '35px' }}
                autoComplete="off" >
                <Form.Item
                    label="Name">
                    <Input name="name" onChange={changeHandler} defaultValue={data.name} />
                </Form.Item>
                <Form.Item
                    label="Description">
                    <Input name="description" onChange={changeHandler} defaultValue={data.description} />
                </Form.Item>
                <Form.Item
                    label="Function">
                    <Select options={functions} name="function" onChange={e => { setData({ ...data, "function": e }) }} defaultValue={data.function} />
                </Form.Item>
                <Form.Item
                    label="Algorithm"
                    name="algorithm">
                    <Input name="algorithm" onChange={changeHandler} defaultValue={data.description} />
                </Form.Item>
                <Form.Item
                    label="Location"
                    name="location">
                    <label>{"/" + location.path.replaceAll(".", "/")}</label> <Button onClick={openFolderModal}>browse</Button>
                </Form.Item>
            </Form>
        },
        {
            title: 'Select Variables',
            content: <Form
                name="variable"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                style={{ marginTop: '35px'}}
                autoComplete="off" >
                <Form.Item
                    label="train table">
                    <Cascader options={getDataCascader(dataSources)} defaultValue={data.trainTableCascaderMeta} onChange={onDataSourceChange} />
                </Form.Item>
                <Table
                    columns={metaColumns}
                    pagination={{ position: ['none', 'none'] }}
                    dataSource={columns}
                >
                </Table>
            </Form>
        },
    ];

    return (
        <div >
            <PageHeader title="Build Model" extra={[
                <Button key="add" onClick={buildModel}>Build Model</Button>,
            ]} />
            <Row>
                <Col span={16} offset={4}>
                    <Steps type="navigation"
                        current={current}
                        onChange={onChange}
                        className="site-navigation-steps">
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div>{steps[current].content}</div>
                    <div style={{ display: "flex", justifyContent: 'flex-end', marginTop: '35px' }}>
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()} >
                                Next
                            </Button>
                        )}
                        {current > 0 && (
                            <Button onClick={() => prev()} >
                                Previous
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>

            <FolderView handleOk={handleFolderSelection} handleCancel={() => setFolderViewVisible(false)} visible={folderViewVisible}/>
        </div>
    )
}