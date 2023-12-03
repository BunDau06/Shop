import React, { useEffect, useState } from "react"
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style"
import InputForm from "../../components/InputForm/InputForm"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import imagelogo from '../../assets/images/lolo-login.png'
import { Image } from "antd"
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { useLocation, useNavigate } from "react-router-dom"
// import { useMutation } from "@tanstack/react-query"
import * as UserService from "../../service/UserService"
import { useMoutationHooks } from "../../hooks/useMoutationHook"
import Loading from "../../components/LoadingComponent/Loading"
import * as message from "../../components/Message/Message"
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"
import { updateUser } from "../../redux/slides/userSlide"
import { isError } from "@tanstack/react-query"

const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const mutation = useMoutationHooks(
        (data) => UserService.loginUser(data)
    )
    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        if (data?.status === "SUCCESS") {
            if (location?.state) {
                navigate(location?.state)
            } else {
                navigate('/')
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
            if (data?.access_token) {
                const decoded = jwt_decode(data?.access_token)
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }
        } else if (data?.status === "ERR") {
            message.error("Tài khoản không tồn tại! vui lòng nhập lại");
        }
    }, [data?.status])

    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storage)
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
    }

    // console.log('mutation', mutation)

    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password
        })
        // console.log('sign-in', email, password)
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 0, 0, 0.53', height: '100vh' }}>
            <div style={{ display: 'flex', width: '800px', height: '445px', borderRadius: '6px', background: '#fff' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '8px',
                                right: '8px'
                            }}
                        >{
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm
                            placeholder="password"
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            onChange={handleOnchangePassword}
                        />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 66, 78)',
                                height: '40px',
                                width: '100%',
                                border: "none",
                                borderRadius: '4px',
                                margin: '26px 0 10px',
                            }}
                            textbutton={'Đăng nhập'}
                            styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </Loading>
                    <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                    <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight> </p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imagelogo} preview={false} alt="image-logo" height={203} width={203} />
                    <h4>Mua sắm tại đây</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignInPage