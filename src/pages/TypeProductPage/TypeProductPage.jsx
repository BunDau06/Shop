import React, { Fragment, useEffect, useState } from "react"
import CardComponent from "../../components/CardComponent/CardComponent"
import NavBarComponent from "../../components/NavbarComponent/NavBarComponent"
import { Col, Pagination, Row } from "antd"
import { WrapButton, WrapperNavbar, WrapperProducts, WrapperStyleNameProduct } from "./style"
import { useLocation } from "react-router-dom"
import * as ProductService from "../../service/ProductService"
import Loading from "../../components/LoadingComponent/Loading"
import { useSelector } from "react-redux"
import { useDebounce } from "../../hooks/useDebounce"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import { useQuery } from "@tanstack/react-query"



const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    })    // sang trang
    // lọc sản phẩm
    const [filterRedProduct, setFilterRedProduct] = useState(products);
    const [stateFilter, setstateFilter] = useState(false);
    const fetchProductType = async (type, page, limit) => {
        setLoading(true)
        const res = await ProductService.getProductType(type, page, limit)
        if (res?.status == 'OK') {
            setLoading(false)
            setProducts(res?.data)
            setPanigate({ ...panigate, total: res?.totalPage })
        } else {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate?.page, panigate?.limit)
        }
    }, [state, panigate?.page, panigate?.limit])

    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pageSize })
    }



    // panigate
    //   const fetchProductType = async (type, page, limit) => {
    //     setIsLoading(true);
    // const res = await ProductService.getAllType(type, page, limit);
    // if (res?.status == "OK") {
    //     setIsLoading(false);
    //     setProduct(res?.data);
    //     setPanigate({ ...panigate, total: res?.totalPages });
    // } else {
    //     setIsLoading(true);
    // }

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit);
        }
    }, [state, panigate.page, panigate.limit]);
    // search

    //   const onChange = (current, pageSize) => {
    //     setPanigate({ ...panigate, page: current - 1, limit: pageSize });
    //   };
    // hàm lọc sản phẩm nhỏ hơn 5 triệu
    const handleStateClick = () => {
        setstateFilter(false)
    };
    const filterProductMin = (products, value) => {
        return products.filter((item) => {
            return item.price <= value;
        });
    };
    const handleFilterMin = () => {
        setstateFilter(true)
        const value = 5000000;
        const filtered = filterProductMin(products, value);
        setFilterRedProduct(filtered);
    };
    // hàm lọc sản phẩm lớn hơn 5 triệu
    const filterProductMax = (products, value) => {
        return products.filter((item) => {
            return item.price >= value;
        });
    };
    const handleFilterMax = () => {
        setstateFilter(true)
        const value = 5000000;
        const filtered = filterProductMax(products, value);
        setFilterRedProduct(filtered);
    };
    useEffect(() => {
        if (!stateFilter) {
            setFilterRedProduct(products)
        } else {
            setFilterRedProduct(filterRedProduct)
        }
    })


    return (
        <Loading isLoading={loading}>
            <div style={{ width: '100%', background: '#efefef', height: '100%' }}>
                <div style={{ margin: '0 auto', width: '1270px', height: '100%' }} >
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% - 20px' }} gutter={{
                        xs: 8,
                        sm: 16,
                        lg: 32,
                    }}>

                        <Col
                            span={5}
                            style={{
                                background: "#fff",
                                borderRadius: "4px 0 0 4px",
                                width: "200px",
                                height: "fit-content",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                            }}
                        >
                            {/* <NavbarComponent /> */}
                            <div>
                                {/* min */}
                                <WrapButton onClick={handleFilterMin}>
                                    Sản phẩm giá nhỏ hơn 5 triệu
                                </WrapButton>
                                {/* max */}
                                <WrapButton onClick={handleFilterMax}>
                                    Sản phẩm giá lớn hơn 5 triệu
                                </WrapButton>
                                {/* không lọc */}
                                <WrapButton onClick={handleStateClick}>default</WrapButton>
                            </div>
                        </Col>
                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts gutter={[10, 10]} >
                                {filterRedProduct?.filter((pro) => {
                                    if (searchDebounce === '') {
                                        return pro
                                    } else if (pro?.name.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                        return pro
                                    }
                                })?.map((product) => {
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
                            <Col span={20}>
                                <Pagination defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
                            </Col>
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    )
}

export default TypeProductPage