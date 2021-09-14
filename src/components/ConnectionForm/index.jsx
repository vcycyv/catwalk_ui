import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

const ConnectionForm = ({ submitForm, cancelForm, connection }) => {
    const [form] = Form.useForm();

    let formConnection = connection;
    useEffect(() => {
        form.setFieldsValue({
            formConnection
        });
        form.resetFields();
    }, [form, formConnection]);


    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    return (
        <Form id="connectionForm" form={form} {...layout}
            initialValues={formConnection}
            onFinish={() => {
                submitForm(form.getFieldsValue());
                form.resetFields();
            }}
            onReset={() => {
                formConnection = { type: 'empty' };
                form.initialValues = { formConnection };
                form.resetFields();
                cancelForm();
            }}>
            <Form.Item name="id" label="id" style={{ display: 'none' }}> {/* hidden */}
                <Input />
            </Form.Item>
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="host" label="Host" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="user" label="User">
                <Input />
            </Form.Item>

            <Form.Item name="password" label="Password">
                <Input  type="password" />
            </Form.Item>

            <Form.Item name="dbName" label="DBName">
                <Input />
            </Form.Item>
        </Form>
    )
}

export default ConnectionForm;