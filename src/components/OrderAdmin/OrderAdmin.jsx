import React, { useEffect, useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { WrapperHeader, WrapperUploadFile } from "./style"
import { Button, Form, Space } from "antd"
import TableComponent from "../TableComponent/TableComponent"
import InputComponent from "../InputComponent/InputComponent"
import DrawerComponent from "../DrawerComponent/DrawerComponent"
import Loading from "../LoadingComponent/Loading"
import { convertPrice, getBase64 } from "../../utils"
import * as message from "../Message/Message"
import { useSelector } from "react-redux"
import * as OrderService from "../../service/OrderService"
import { useQuery } from "@tanstack/react-query"
import ModalComponent from "../ModalComponent/ModalComponent"
import { orderContant } from "../../contant"
import PieChartComponent from "./PieChart"



const OrderAdmin = () => {
    const user = useSelector((state) => state?.user)

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token)
        // console.log('res', res)
        return res
    }



    // console.log('dataUpdated', dataUpdated)
    const queryOrder = useQuery({ queryKey: ['order'], queryFn: getAllOrder })
    const { isLoading: isLoadingOrders, data: orders } = queryOrder
    // console.log('products', products)



    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    // ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        // onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                // setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{
        //         backgroundColor: '#ffc069',
        //         padding: 0,
        //       }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
    });

    const columns = [
        {
            title: 'User name',
            dataIndex: 'userName',
            // render: (text) => <a>{text}</a>,
            sorter: (a, b) => a?.userName?.length - b?.userName?.length,
            ...getColumnSearchProps('userName')
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a?.address?.length - b?.address?.length,
            ...getColumnSearchProps('address')
        },
        {
            title: 'Price Items',
            dataIndex: 'itemsPrice',
            sorter: (a, b) => a?.itemsPrice?.length - b?.itemsPrice?.length,
            ...getColumnSearchProps('itemsPrice')
        },
        {
            title: 'Paided',
            dataIndex: 'isPaid',
            sorter: (a, b) => a?.isPaid?.length - b?.isPaid?.length,
            ...getColumnSearchProps('isPaid')
        },
        {
            title: 'Shiped',
            dataIndex: 'isDelivered',
            sorter: (a, b) => a?.isDelivered?.length - b?.isDelivered?.length,
            ...getColumnSearchProps('isDelivered')
        },


        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a?.paymentMethod?.length - b?.paymentMethod?.length,
            ...getColumnSearchProps('paymentMethod')
        },
        {
            title: 'Price total',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a?.totalPrice?.length - b?.totalPrice?.length,
            ...getColumnSearchProps('totalPrice')
        },


    ];

    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
        console.log('suer', order)
        return {
            ...order, key: order._id,
            userName: order?.shippingAddress?.fullname,
            phone: order?.shippingAddress?.phone,
            address: order?.shippingAddress?.address,
            paymentMethod: orderContant.payment[order?.paymentMethod],
            isPaid: order?.isPaid ? 'True' : 'False',
            isDelivered: order?.isDelivered ? 'True' : 'False',
            totalPrice: convertPrice(order?.totalPrice),
            itemsPrice: convertPrice(order?.itemsPrice)
        }
    })
    // totalPrice: order.totalPrice, itemsPrice: order?.itemsPrice, shippingPrice: order?.shippingPrice

    return (
        <div >
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
            <div style={{ height: '200px', width: '200px' }}>
                <PieChartComponent data={orders?.data} />
            </div>
            {/* <div style={{ marginTop: '10px' }}>
                <Button style={{
                    height: '150px',
                    width: '150px',
                    borderRadius: '6px',
                    borderStyle: 'dashed'
                }}>
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div> */}
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isLoading={isLoadingOrders} data={dataTable} />
            </div>

        </div>
    )
}

export default OrderAdmin

