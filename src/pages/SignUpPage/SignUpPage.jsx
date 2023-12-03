import React, { useEffect } from "react"
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style"
import { Image } from "antd"
import InputForm from "../../components/InputForm/InputForm"
import imagelogo from '../../assets/images/lolo-login.png'
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import { useState } from "react"
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import * as UserService from "../../service/UserService"
import { useMoutationHooks } from "../../hooks/useMoutationHook"
import Loading from "../../components/LoadingComponent/Loading"
import * as message from "../../components/Message/Message"

const SignUpPage = () => {
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const mutation = useMoutationHooks(
        (data) => UserService.signupUser(data)
    )

    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        if (data?.status === "SUCCESS") {
            message.success()
            handleNavigateSignIn()
        } else if (data?.status === "ERR") {
            message.error("Nhập sai vui lòng nhập lại!")
        }
    }, [isSuccess, isError])

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }

    const handleSignUp = () => {
        mutation.mutate({ email, password, confirmPassword })

        // console.log('sign-up', email, password, confirmPassword)
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
                        <InputForm style={{ marginBottom: '10px' }} placeholder="password" type={isShowPassword ? "text" : "password"}
                            value={password} onChange={handleOnchangePassword} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '8px',
                                right: '8px'
                            }}
                        >{
                                isShowConfirmPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm placeholder="confirm password" type={isShowConfirmPassword ? "text" : "password"}
                            value={confirmPassword} onChange={handleOnchangeConfirmPassword} />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length}
                            onClick={handleSignUp}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 66, 78)',
                                height: '40px',
                                width: '100%',
                                border: "none",
                                borderRadius: '4px',
                                margin: '26px 0 10px',
                            }}
                            textbutton={'Đăng ký'}
                            styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </Loading>
                    <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập ngay</WrapperTextLight> </p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imagelogo} preview={false} alt="image-logo" height={203} width={203} />
                    <h4>Mua sắm tại đây</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignUpPage