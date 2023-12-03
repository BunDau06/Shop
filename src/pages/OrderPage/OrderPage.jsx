import { Button, Checkbox, Form } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
// import imag from '../../assets/images/test.webp'
import { WrapperInputNumber, WrapperQualityProduct } from '../../components/ProductDetailsComponent/style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMoutationHooks } from '../../hooks/useMoutationHook';
import * as UserService from '../../service/UserService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from "../../components/Message/Message"
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import StepComponent from '../../components/StepComponent/StepComponent';

const OrderPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [listChecked, setListChecked] = useState([])
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    });
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListChecked)
        } else {
            setListChecked([...listChecked, e.target.value])
        }
    };
    const handleChangeCount = (type, idProduct, limited) => {
        if (type === 'increase') {
            if (!limited) {
                dispatch(increaseAmount({ idProduct }))
            }
        } else {
            if (!limited) {
                dispatch(decreaseAmount({ idProduct }))
            }
        }
    }
    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }))
    }
    const handleOnchangeCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = []
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product)
            })
            setListChecked(newListChecked)
        } else {
            setListChecked([])
        }
    }
    useEffect(() => {
        dispatch(selectedOrder({ listChecked }))
    }, [listChecked])

    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone,
            })
        }
    }, [isOpenModalUpdateInfo])

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            const totalDiscount = cur.discount ? cur.discount : 0
            return total + (priceMemo * (totalDiscount * cur.amount) / 100)
        }, 0)
        if (Number(result)) {
            return result
        }
        return 0
    }, [order])

    const dileveryPriceMemo = useMemo(() => {
        if (priceMemo >= 2000000 && priceMemo < 5000000) {
            return 10000
        } else if ((priceMemo >= 5000000 || order?.orderItemsSelected?.length === 0)) {
            return 0
        } else {
            return 20000
        }
    }, [priceMemo])

    // tổng tiền
    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(dileveryPriceMemo)
    }, [priceMemo, priceDiscountMemo, dileveryPriceMemo])

    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 0) {
            dispatch(removeAllOrderProduct({ listChecked }))
        }
    }

    const handleAddCard = () => {
        if (!order?.orderItemsSelected?.length) {
            message.error('Vui lòng chọn sản phẩm')
        } else if (!user?.phone || !user?.address || !user?.name || !user?.city) {
            setIsOpenModalUpdateInfo(true)
        } else {
            navigate('/payment')
        }
    }

    const mutationUpdate = useMoutationHooks(
        (data) => {
            const { id, token, ...rests } = data
            const res = UserService.updateUser(id, { ...rests }, token)
            return res
        },
    )

    const { isLoading, data } = mutationUpdate
    // console.log('data', data)

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }


    const handleUpdateInfoUser = () => {
        const { name, address, city, phone } = stateUserDetails
        if (name && address && city && phone) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
                onSuccess: () => {
                    dispatch(updateUser({ name, address, city, phone }))
                    setIsOpenModalUpdateInfo(false)
                }
            })
        }
    }

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    const itemsDelivery = [
        {
            title: '20.000 VND',
            description: 'Dưới 200.000 VND',
        },
        {
            title: '10.000 VND',
            description: 'Từ 200.000 VND đến dưới 500.000 VND',
        },
        {
            title: '0 VND',
            description: 'Trên 500.000 VND',
        },
    ]

    return (
        <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3>Giỏ hàng</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <WrapperStyleHeaderDilivery>
                            <StepComponent items={itemsDelivery} current={dileveryPriceMemo === 10000 ? 2 : dileveryPriceMemo === 20000 ? 1
                                : order.orderItemsSelected.length === 0 ? 0 : 3} />
                        </WrapperStyleHeaderDilivery>
                        <WrapperStyleHeader>
                            <span style={{ display: 'inline-block', width: '390px' }}>
                                <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
                                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                            </span>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            {order?.orderItems?.map((order) => {
                                return (
                                    <WrapperItemOrder key={order?.product}>
                                        <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                                            <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                            <div style={{
                                                width: 260,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>{order?.name}</div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                                            </span>
                                            <WrapperCountOrder>
                                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                                    onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1)}>
                                                    <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                                <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInStock} />
                                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                                    onClick={() => handleChangeCount('increase', order?.product, order?.amount === order?.countInStock)}>
                                                    <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                            </WrapperCountOrder>
                                            <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}</span>
                                            <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                                        </div>
                                    </WrapperItemOrder>
                                )
                            })}
                        </WrapperListOrder>
                    </WrapperLeft>
                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                            <WrapperInfo>
                                <div>
                                    <span>Địa chỉ giao hàng: </span>
                                    <span style={{ fontWeight: 'bold' }}>{`${user?.address} ${user?.city}`}</span>
                                    <span onClick={handleChangeAddress} style={{ color: 'blue', cursor: 'pointer', }}> Chỉnh sửa</span>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span>
                                </div>
                                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Thuế</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
                                </div> */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(dileveryPriceMemo)}</span>
                                </div>
                            </WrapperInfo>
                            <WrapperTotal style={{ width: '100%' }}>
                                <span>Tổng tiền</span>
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                </span>
                            </WrapperTotal>
                        </div>
                        <ButtonComponent
                            onClick={() => handleAddCard()}
                            size={40}
                            style={{
                                margin: "26px 0px 10px",
                                backgroundColor: "rgb(255, 57, 69)",
                                borderRadius: "4px",
                                height: '48px',
                                width: '220px',
                                border: 'none',
                            }}
                            textbutton={'Đặt hàng'}
                            styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperRight>
                </div>
            </div>
            <ModalComponent forceRender title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
                <Loading isLoading={isLoading}>
                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        // style={{ maxWidth: 600 }}
                        // initialValues={{ remember: true }}
                        // onFinish={onUpdateUser}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item type="primary" htmlType="submit"
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your Name!' }]}
                        >
                            <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item type="primary" htmlType="submit"
                            label="City"
                            name="city"
                            rules={[{ required: true, message: 'Please input your City!' }]}
                        >
                            <InputComponent value={stateUserDetails.city} onChange={handleOnchangeDetails} name="city" />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your Phone!' }]}
                        >
                            <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your Address!' }]}
                        >
                            <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                        </Form.Item>
                        {/* <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item> */}
                    </Form>
                </Loading>
            </ModalComponent>
        </div>
    )
}



// import { Checkbox } from 'antd'
// import React, { useState } from 'react'
// import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal } from './style'; import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
// // import imag from '../../assets/images/test.webp'
// import { WrapperInputNumber, WrapperQualityProduct } from '../../components/ProductDetailsComponent/style';
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
// import { useDispatch, useSelector } from 'react-redux';
// import { convertPrice } from '../../utils';
// import { decreaseAmount, increaseAmount } from '../../redux/slides/orderSlide';
// // import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct } from '../../redux/slides/orderSlide';

// const OrderPage = () => {
//     const order = useSelector((state) => state.order)
//     const [listChecked, setListChecked] = useState([])
//     const dispatch = useDispatch()
//     const onChange = (e) => {
//         if (listChecked.includes(e.target.value)) {
//             const newListChecked = listChecked.filter((item) => item !== e.target.value)
//             setListChecked(newListChecked)
//         } else {
//             setListChecked([...listChecked, e.target.value])
//         }
//     };

//     const handleChangeCount = (type, idProduct) => {
//         if (type === 'increase') {
//             dispatch(increaseAmount({ idProduct }))
//         } else {
//             dispatch(decreaseAmount({ idProduct }))
//         }
//     }

//     const handleDeleteOrder = (idProduct) => {
//         // dispatch(removeOrderProduct({idProduct}))
//     }

//     const handleOnchangeCheckAll = (e) => {
//         if (e.target.checked) {
//             const newListChecked = []
//             order?.orderItems?.forEach((item) => {
//                 newListChecked.push(item?.product)
//             })
//             setListChecked(newListChecked)
//         } else {
//             setListChecked([])
//         }
//     }

//     const handleRemoveAllOrder = () => {
//         // if(listChecked?.length > 1){
//         //   dispatch(removeAllOrderProduct({listChecked}))
//         // }
//     }

//     return (
//         <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
//             <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
//                 <h3>Giỏ hàng</h3>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     <WrapperLeft>
//                         <WrapperStyleHeader>
//                             <span style={{ display: 'inline-block', width: '390px' }}>
//                                 <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
//                                 <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
//                             </span>
//                             <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                 <span>Đơn giá</span>
//                                 <span>Số lượng</span>
//                                 <span>Thành tiền</span>
//                                 <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
//                             </div>
//                         </WrapperStyleHeader>
//                         <WrapperListOrder>
//                             {order?.orderItems?.map((order) => {
//                                 return (
//                                     <WrapperItemOrder key={order?.product}>
//                                         <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
//                                             <CustomCheckbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></CustomCheckbox>
//                                             <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
//                                             <div style={{
//                                                 width: 260,
//                                                 overflow: 'hidden',
//                                                 textOverflow: 'ellipsis',
//                                                 whiteSpace: 'nowrap'
//                                             }}>{order?.name}</div>
//                                         </div>
//                                         <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                             <span>
//                                                 <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
//                                             </span>
//                                             <WrapperCountOrder>
//                                                 <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1)}>
//                                                     <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
//                                                 </button>
//                                                 <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInstock} />
//                                                 <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product, order?.amount === order.countInstock, order?.amount === 1)}>
//                                                     <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
//                                                 </button>
//                                             </WrapperCountOrder>
//                                             <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}</span>
//                                             <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
//                                         </div>
//                                     </WrapperItemOrder>
//                                 )
//                             })}
//                         </WrapperListOrder>
//                         {/* <WrapperListOrder>
//                             {order?.orderItems?.map((order) => {
//                                 return (
//                                     <WrapperItemOrder>
//                                         <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
//                                             <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
//                                             <img src={order?.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
//                                             <div style={{
//                                                 width: 260,
//                                                 overflow: 'hidden',
//                                                 textOverflow: 'ellipsis',
//                                                 whiteSpace: 'nowrap'
//                                             }}>{order?.name}</div>
//                                         </div>
//                                         <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                             <span>
//                                                 <span style={{ fontSize: '13px', color: '#242424' }}>{order?.price}</span>
//                                             </span>
//                                             <WrapperCountOrder>
//                                                 <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product)}>
//                                                     <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
//                                                 </button>
//                                                 <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" />
//                                                 <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product)}>
//                                                     <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
//                                                 </button>
//                                             </WrapperCountOrder>
//                                             <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{order?.price * order?.amount}</span>
//                                             <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
//                                         </div>
//                                     </WrapperItemOrder>
//                                 )
//                             })}
//                         </WrapperListOrder> */}
//                     </WrapperLeft>
//                     <WrapperRight>
//                         <div style={{ width: '100%' }}>
//                             <WrapperInfo>
//                                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                     <span>Tạm tính</span>
//                                     <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
//                                 </div>
//                                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                     <span>Giảm giá</span>
//                                     <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
//                                 </div>
//                                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                     <span>Thuế</span>
//                                     <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
//                                 </div>
//                                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                     <span>Phí giao hàng</span>
//                                     <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
//                                 </div>
//                             </WrapperInfo>
//                             <WrapperTotal>
//                                 <span>Tổng tiền</span>
//                                 <span style={{ display: 'flex', flexDirection: 'column' }}>
//                                     <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>0213</span>
//                                     <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
//                                 </span>
//                             </WrapperTotal>
//                         </div>
//                         <ButtonComponent
//                             // onClick={() => handleAddCard(productDetails, numProduct)}
//                             size={40}
//                             style={{
//                                 margin: "26px 0px 10px",
//                                 backgroundColor: "rgb(255, 57, 69)",
//                                 borderRadius: "4px",
//                                 height: '48px',
//                                 width: '220px',
//                                 border: 'none',
//                                 borderRadius: '4px'
//                             }}
//                             textbutton={'Mua hàng'}
//                             styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
//                         ></ButtonComponent>
//                     </WrapperRight>
//                 </div>
//             </div>
//         </div>
//     )
// }



export default OrderPage