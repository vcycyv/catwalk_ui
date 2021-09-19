import React, { useEffect } from 'react';
import { PageHeader, Modal, Table, Select, Space } from 'antd';

import { connectionService } from '../services';

export default function ConnectionTablesPage(props) {
    const { connectionID } = props.match.params

    const [tables, setTables] = React.useState([]);
    const [data, setData] = React.useState([]);

    useEffect(() => {
        connectionService.getConnectionTables(connectionID)
            .then(
                response => {
                    if (response.status < 300) {
                        setTables(response.data)
                    } else {
                        Modal.error({
                            title: 'Error',
                            content: (
                                <>
                                    It failed to get connection tables:
                                    <br />
                                    &nbsp;&nbsp;{response.data.message}
                                </>
                            )
                        })
                    }
                }
            )
    }, [connectionID])

    function handleChange(value) {
        console.log(`selected ${value}`);
        if (value.length > 0) {
            connectionService.getConnectionTableData(connectionID, value)
                .then(
                    response => {
                        setData(response.data)
                    }
                )
        } else {
            setData([])
        }

    }

    function getColumns(data) {
        if (data.length > 0) {
            return data[0].map((column) => {
                return {
                    "title": column,
                    "dataIndex": column,
                    "key": column,
                }
            })
        } else {
            return []
        }
    }

    function getDataSource(data) {
        var dataSource = [];

        var columns = getColumns(data);

        for (var i = 1; i < data.length; i++) {
            var column = { "key": i };
            for (var j = 0; j < columns.length; j++) {
                column[columns[j].key] = data[i][j];
            }
            dataSource.push(column);
        }
        return dataSource;
    }

    const { Option } = Select;

    return (
        <div>
            <PageHeader title="Connection Tables" />
            <Space>
                Table:
                <Select style={{ width: 220 }} onChange={handleChange}>
                    <Option value=""></Option>
                    {tables.map(table => <Option key={table}>{table}</Option>)}
                </Select>
            </Space>
            <Table dataSource={getDataSource(data)} columns={getColumns(data)} />;
        </div>
    )
}