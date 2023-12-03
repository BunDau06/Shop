import { Col, Image, InputNumber, Rate, Row, } from "antd"
import React, { useEffect, useMemo, useState } from "react"
import imageProductSmall from '../../assets/images/test2.webp'
import { ContentDescription, WrapContent, WrapperAddressProduct, WrapperBtnQualtityProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualtityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style"
import { StarFilled, PlusOutlined, PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons'
import ButtonComponent from "../ButtonComponent/ButtonComponent"
import * as ProductService from "../../service/ProductService"
import { useQuery } from "@tanstack/react-query"
import Loading from "../LoadingComponent/Loading"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide"
import { convertPrice, initFacebookSDK } from "../../utils"
import ModalComponent from "../ModalComponent/ModalComponent"
import * as message from "../../components/Message/Message"
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent"
import CommentComponent from "../CommentComponent/CommentComponent"

const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    // const order = useSelector((state) => state.order)
    // const [errorLimitOrder, setErrorLimitOrder] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const onChange = (value) => {
        setNumProduct(Number(value))
    }


    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            return res?.data
        }
    }
    useEffect(() => {
        initFacebookSDK()
    }, [])

    // useEffect(() => {
    //     const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
    //     if ((orderRedux?.amount + numProduct) <= orderRedux?.countInStock) {
    //         setErrorLimitOrder(false)
    //     } else {
    //         setErrorLimitOrder(true)
    //     }
    // }, [numProduct])

    // useEffect(() => {
    //     const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
    //     if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
    //         setErrorLimitOrder(false)
    //     } else {
    //         setErrorLimitOrder(true)
    //     }
    // }, [numProduct])

    // useEffect(() => {
    //     if (order.isSucessOrder) {
    //         message.success('Đã thêm vào giỏ hàng')
    //     }
    //     return () => {
    //         dispatch(resetOrder())
    //     }
    // }, [order.isSucessOrder])

    // const handleChangeCount = (type) => {
    //     if (type === 'increase') {
    //         setNumProduct(numProduct + 1)
    //     } else if (type === 'decrease') {
    //         setNumProduct(numProduct - 1)
    //     }
    // }

    const handleChangeCount = (type, limited) => {
        if (type === 'increase') {
            //     if (!limited) {
            setNumProduct(numProduct + 1)
            // }
        } else {
            //     if (!limited) {
            setNumProduct(numProduct - 1)
        }
        // }
    }

    const { isLoading, data: productDetails, } = useQuery(['product-details', idProduct], fetchGetDetailsProduct, { enabled: !!idProduct })
    const [editedDescription, setEditedDescription] = useState('');

    const handleInputChange = (event) => {
        setEditedDescription(event.target.value);
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            setEditedDescription((prevDescription) => prevDescription + '\n');
        }
    };

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {

            //tìm item ở rderRedux
            // const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            // const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            // console.log('pro', orderRedux)
            // if ((orderRedux?.amount + numProduct) <= orderRedux?.countInStock) {
            // if ((orderRedux?.amount + numProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id,
                    discount: productDetails?.discount,
                    countInStock: productDetails?.countInStock,
                }
            }))
            // } else {
            //     // setErrorLimitOrder(true)
            // }
        }
    }

    return (
        <Loading isLoading={isLoading}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '10px' }}>
                    <Image src={productDetails?.image} alt="image product" preview={false} />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between', }}>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall style={{ width: '64px', height: '64px' }} src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>

                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>
                        <span>Điện thoại </span>
                        {productDetails?.name}
                    </WrapperStyleNameProduct>
                    <div>
                        {/* gọi rating từ back end */}
                        <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperStyleTextSell> | Đã bán 100+ </WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
                    </WrapperPriceProduct>

                    {/* <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className="address"> {user?.address}</span> -
                        <span className="change-address" > Đổi địa chỉ</span>
                    </WrapperAddressProduct> */}
                    <LikeButtonComponent
                        dataHref={process.env.REACT_APP_IS_LOCAL
                            ? "https://developers.facebook.com/docs/plugins/"
                            : window.location.href
                        }
                    />
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQualtityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numProduct === 1)} >
                                <MinusSquareOutlined style={{ color: '#000', fontSize: '20px', }} />
                            </button>
                            <WrapperInputNumber onChange={onChange} value={numProduct} max={productDetails?.countInStock} min={1} defaultValue={1} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}>
                                <PlusSquareOutlined style={{ color: '#000', fontSize: '20px', }} />
                            </button>
                        </WrapperQualtityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div>
                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: 'rgb(255, 66, 78)',
                                    height: '40px',
                                    width: '220px',
                                    border: "none",
                                    borderRadius: '4px',
                                }}
                                onClick={handleAddOrderProduct}
                                textbutton={'Mua Ngay'}
                                styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                            {/* {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>} */}
                        </div>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '40px',
                                width: '220px',
                                border: '1px solid rgb(13, 92, 182)',
                                borderRadius: '4px',
                            }}
                            textbutton={'Mua Trả Sau'}
                            styletextbutton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                        ></ButtonComponent>
                    </div>

                    <div>

                        <WrapContent>
                            <ContentDescription
                                // value={editedDescription || productDetails?.description}
                                value={editedDescription}
                                onChange={handleInputChange}
                                onKeyDown={handleEnterKey}
                                style={{ whiteSpace: 'pre-line' }}
                            />
                            {editedDescription || productDetails?.description}
                        </WrapContent>

                    </div>

                    {/* <div>
                        <WrapContent>
                            <ContentDescription style={{ whiteSpace: 'pre-line' }}>
                                {productDetails?.description}
                            </ContentDescription>
                        </WrapContent>
                    </div> */}
                    {/* <div>
                        <WrapContent>
                            <ContentDescription style={{ whiteSpace: 'pre-line' }}>
                                {productDetails?.description || 'Chưa có mô tả'}
                            </ContentDescription>
                        </WrapContent>
                        {!productDetails?.description && (
                            <p>Thêm một số nội dung xuống dòng vào mô tả sản phẩm.</p>
                        )}
                    </div> */}
                </Col>
                <CommentComponent
                    dataHref={process.env.REACT_APP_IS_LOCAL
                        ? "https://developers.facebook.com/docs/plugins/comments#configurator"
                        : window.location.href
                    } width="100%"
                />

            </Row>

        </Loading>
    )
}

export default ProductDetailsComponent