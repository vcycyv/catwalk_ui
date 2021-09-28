import React, { useState } from 'react';
import { Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DrawerViewer from './DrawerViewer';

const AddCSVToDrawerForm = ({ submitForm, cancelForm }) => {
    const [drawerID, setDrawerID] = React.useState("");
    const [newDrawerName, setNewDrawerName] = React.useState("");
    const [file, setFile] = React.useState();

    const [form] = Form.useForm();

    const onDrawerRadioChange = e => {
        console.log('radio checked', e.target.value);
        setDrawerID(e.target.value);
    }

    const onDrawerInputChange = e => {
        setNewDrawerName(e.target.value)
    }

    const uploadProps = {
        onRemove: () => {
            setFile(undefined)
            return {
                fileList: [],
            };
        },
        beforeUpload: file => {
            setFile(file);
            return false;
        },
        fileList: file === undefined ? [] : [file],
    };

    return (
        <Form id="AddDataSourceForm" form={form}
            onFinish={() => {
                submitForm(drawerID, newDrawerName, file);
                form.resetFields();
            }}
            onReset={() => {
                form.resetFields();
                cancelForm();
            }}>
            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} >Click to Upload</Button>
            </Upload>
            <div style={{marginTop: '35px'}}/>
            <DrawerViewer onDrawerRadioChange={onDrawerRadioChange} onDrawerInputChange={onDrawerInputChange} />
        </Form>
    )
}

export default AddCSVToDrawerForm;