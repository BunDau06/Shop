import { Dropdown, Space, Table, } from "antd";
import React, { useMemo, useState } from "react"
import Loading from "../LoadingComponent/Loading"
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data: dataSource = [], isLoading = false, columns = [], handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const columnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])

    // const columns = [
    //     {
    //     title: 'Name',
    //     dataIndex: 'name',
    //     render: (text) => <a>{text}</a>,
    //     },
    //     {
    //     title: 'Price',
    //     dataIndex: 'price',
    //     },
    //     {
    //     title: 'Rating',
    //     dataIndex: 'rating',
    //     },
    //     {
    //     title: 'Type',
    //     dataIndex: 'type',
    //     },
    //     {
    //     title: 'Action',
    //     dataIndex: 'action',
    //     render: (text) => <a>{text}</a>,
    //     },
    // ];
    // const data = products?.length && products?.map((products) => {
    //     return {...products, key: products._id}
    // })


    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)
    }

    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(columnExport)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };
    const items = [
        {
            key: '1',


            label: (
                <a onClick={handleDeleteAll} target="_blank" rel="noopener noreferrer">
                    Xóa tất cả
                </a>

            )
            // icon: <SmileOutlined />,

        },
        {
            key: '2',


            label: (
                <button style={{}} onClick={exportExcel}>Exprot Excel</button>

            )
            // icon: <SmileOutlined />,

        },
    ];




    return (
        <Loading isLoading={isLoading}>
            {rowSelectedKeys.length > 0 && (
                <div style={{ padding: '10px' }} >
                    <Dropdown menu={{ items }} >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Menu
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            )}
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </Loading>
    )
}

export default TableComponent