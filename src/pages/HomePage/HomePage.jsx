import React, { useEffect, useRef, useState } from "react"
import TypeProduct from "../../components/TypeProduct/TypeProduct"
import { InputInfo, WrapperButtonMore, WrapperProducts, WrapperTypeProduct, WrapperInfo } from "./stye"
import SliderComponent from "../../components/SliderComponent/SliderComponent"
import slider1 from "../../assets/images/slider1.jpg"
import slider2 from "../../assets/images/slider2.webp"
import silder3 from "../../assets/images/silder3.png"
import CardComponent from "../../components/CardComponent/CardComponent"
import NavBarComponent from "../../components/NavbarComponent/NavBarComponent"
import { Button } from "antd"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import { useQuery } from "@tanstack/react-query"
import * as ProductService from "../../service/ProductService"
import { useSelector } from "react-redux"
import Loading from "../../components/LoadingComponent/Loading"
import { useDebounce } from "../../hooks/useDebounce"
import Footer from "../../components/Footer/Footer";
// import { searchProduct } from "../../redux/slides/counterSlide"

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(6)
    const [typeProduct, setTypeProduct] = useState([])
    const fetchProductAll = async (context) => {
        // if (search?.length > 0) { }
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
        return res
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProduct(res?.data)
        }
    }

    const { isLoading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    return (
        <Loading isLoading={isLoading || loading}>
            <WrapperTypeProduct >
                {typeProduct.map((item) => {
                    return (
                        <TypeProduct name={item} key={item} />
                    )
                })}
            </WrapperTypeProduct>
            <div style={{
                padding: " 0 120px",
                backgroundColor: "#fff",
                // borderBottom: " 1px solid #ff761c",
                marginBottom: "10px",
                height: '100%'
            }}>
                <div style={{ width: '1270px', margin: '0 auto' }}>

                    <div>
                    </div>
                    <div className="body" style={{ width: '100%', backgroundColor: '#efefef', }}>
                        <div id="container" style={{ margin: '0 auto', height: '100%', width: "1270px" }} >
                            <SliderComponent arrImages={[slider1, slider2, silder3]} />
                            <WrapperProducts>
                                {products?.data?.map((product) => {
                                    return (
                                        <CardComponent
                                            key={product._id}
                                            countInStock={product.countInStock}
                                            description={product.description}
                                            image={product.image}
                                            name={product.name}
                                            price={product.price}
                                            rating={product.rating}
                                            type={product.type}
                                            selled={product.selled}
                                            discount={product.discount}
                                            id={product._id}
                                        />

                                    )
                                })}
                            </WrapperProducts>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px', paddingTop: '20px', paddingBottom: '20px' }} >
                                <WrapperButtonMore
                                    textbutton={isPreviousData ? "Xem thêm" : "Xem thêm"} type="outline" styleButton={{
                                        border: '1px solid rgb(11, 116, 229)', color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11, 116, 229)'}`,
                                        width: '240px', height: '38px', borderRadius: '4px'
                                    }}
                                    disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                                    styletextbutton={{
                                        fontWeight: 500, color: products?.total === products?.data?.length && 'rgba(0, 0, 0, 0.45)'
                                    }}
                                    //xem thêm
                                    onClick={() => setLimit((prev) => prev + 6)} />

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </Loading >
    )
}

export default HomePage