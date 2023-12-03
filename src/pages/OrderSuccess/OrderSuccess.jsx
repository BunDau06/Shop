import React from 'react'
import {
    WrapperCountOrder, WrapperInfo, WrapperItemOrder,
    WrapperContainer, WrapperListOrder, WrapperPriceDiscount,
    WrapperRight, WrapperStyleHeader, WrapperTotal, Lable, WrapperRadio, WrapperValue, WrapperItemOrderInfo
} from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
const OrderSuccess = () => {
    const location = useLocation()
    const { state } = location
    // console.log('location', location)
    const order = useSelector((state) => state.order)

    return (
        <div style={{ background: '#f5f5fa', with: '100%', height: '100%' }}>
            <Loading isLoading={false}>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h3 style={{ margin: '0', padding: '10px 0', fontSize: '18px' }}>Đơn hàng đã đặt thành công</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperContainer>
                            <WrapperInfo>
                                <div>
                                    <Lable>Phương thức giao hàng</Lable>
                                    <WrapperValue>
                                        <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Lable>Chọn phương thức thanh toán</Lable>
                                    <WrapperValue>
                                        {orderContant.payment[state?.payment]}
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperItemOrderInfo>
                                {state.orders?.map((order) => {
                                    return (
                                        <div>
                                            <WrapperItemOrder key={order?.name}>
                                                <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                                    <div style={{
                                                        width: 260,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}>{order?.name}</div>
                                                </div>
                                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '50px' }}>
                                                    <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <span style={{ fontSize: '13px', color: '#242424', }}>Giá tiền: {convertPrice(order?.price)}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <spdivan style={{ fontSize: '13px', color: '#242424', }}>Số lượng: {order?.amount}</spdivan>
                                                    </div>
                                                </div>
                                            </WrapperItemOrder>
                                        </div>
                                    )
                                })}
                                <div style={{ padding: '10px 0 0 30px', textAlign: 'right', }}>
                                    <span>
                                        <span style={{ fontSize: '18px', color: 'red', padding: '20px', fontWeight: '700', }}>Tổng cộng: {convertPrice(state?.totalPriceMemo)}</span>
                                    </span>
                                </div>
                            </WrapperItemOrderInfo>
                        </WrapperContainer>


                    </div>
                </div>
            </Loading>
        </div>
    )
}


export default OrderSuccess