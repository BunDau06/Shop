import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { routes } from './routes';
import './App.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJonString } from './utils';
import jwt_decode from "jwt-decode";
import * as UserService from "./service/UserService";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from './redux/slides/userSlide';
import Loading from './components/LoadingComponent/Loading';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {                                                     // cấp tại token hết hạn khi reload
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
    // decoded = jwt_decode(storageData);      
    //     const {storageData, decoded} = handleDecoded()
    //     const {storageData, decoded} = handleDecoded()
    //       if (decoded?.id) {
    //         handleGetDetailsUser(decoded?.id, storageData)
    //       }
  }, [])



  const handleDecoded = () => {
    // let storageData = localStorage.getItem('access_token')
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = {}
    // console.log('storageData', storageData, isJonString(storageData))
    // if (storageData && isJonString(storageData) ) {
    if (storageData && isJonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData)
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken = jwt_decode(refreshToken)
    if (decoded?.exp < currentTime.getTime() / 1000) {         // nếu decoded.thời gian token hết hạn < hơn thời gian hiện tại (/1000 chuyển về đơn vị mili s)
      if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken()
        config.headers['token'] = `Bearer ${data?.access_token}`
      } else {
        dispatch(resetUser())
      }
    }
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error)
  })

  //   const handleGetDetailsUser = async (id, token) => {
  //     const res = await UserService.getDetailsUser(id, token)
  //     dispatch(updateUser({...res?.data, access_token: token}))
  // };


  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken }))
    // setIsLoading(false)
  }


  // useEffect(() => {
  //   fetchApi()
  // }, [])  
  // console.log('process.env.REACT_API_URL_BACKEND', process.env.REACT_APP_API_URL)

  // const fetchApi = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
  //   return res.data
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log('query', query)
  return (
    <div className='app'>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              // const ischeckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              // const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={route.path} element={
                  // <Route key={route.path} path={ischeckAuth && route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}

export default App