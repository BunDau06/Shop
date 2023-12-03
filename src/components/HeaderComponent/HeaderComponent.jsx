import { Badge, Col, Popover } from "antd"
import React, { useEffect, useState } from "react"
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperHeaderSmall, WrapperTextHeader } from "./style"
import Search from "antd/es/transfer/search"
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonIutSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../service/UserService"
import { resetUser } from "../../redux/slides/userSlide"
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slides/counterSlide";


const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const order = useSelector((state) => state.order)
    const [loading, setLoading] = useState(false)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
            <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    const handleClickNavigate = (type) => {
        if (type === 'profile') {
            navigate('/profile-user')
        } else if (type === 'admin') {
            navigate('/system/admin')
        } else if (type === 'my-order') {
            navigate('/my-order', {
                state: {
                    id: user?.id,
                    token: user?.access_token
                }
            })
        } else {
            handleLogout()
        }
        setIsOpenPopup(false)
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }
    // console.log('user', user)    background-image: linear-gradient(to right, rgb(2 46 191) 0%, #010c36 100%);
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundImage: 'linear-gradient(to right, rgb(2 46 191) 0%, #010c36 100%)' }}>
            {/* Style: khi isHiddenSearch & isHiddenCart = true thì có style not true là mặc định */}
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? "space-between" : 'unset' }}>
                <Col span={5}>
                    <WrapperTextHeader to='/'>WBL</WrapperTextHeader>
                </Col>
                {/* fasle thì hiện btnSearch true thì ẩn */}
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size="large"
                            // textbutton="Tìm Kiếm"
                            placeholder="input search text"
                            allowClear
                            bordered={false}
                            onChange={onSearch}
                        />
                    </Col>
                )}
                <Col span={6} style={{ display: "flex", gap: '120px', alignItems: "center" }}>
                    <Loading isLoading={loading}>
                        <WrapperHeaderAccout>
                            {userAvatar ? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}
                            {user?.access_token ? (                        //nếu có access_token thì lấy user name, user email, 'user' 
                                <>
                                    <Popover content={content} trigger="click" open={isOpenPopup}>
                                        <div style={{ cursor: 'pointer' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperHeaderSmall>Đăng nhập/Đăng ký</WrapperHeaderSmall>
                                    <div>
                                        <WrapperHeaderSmall>  Tài khoản</WrapperHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}

                        </WrapperHeaderAccout>
                    </Loading>
                    {/* fasle thì hiện Cart true thì ẩn */}
                    {!isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff', }} />
                            </Badge>
                            <WrapperHeaderSmall>Giỏ hàng</WrapperHeaderSmall>
                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div >
    )
}

export default HeaderComponent