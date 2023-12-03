import React from "react"
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent"
import { useNavigate, useParams } from "react-router-dom"

const ProductDetailsPage = () => {
    const { id } = useParams()  // sử dụng useParams của "react-router-dom" để lấy id
    const navigate = useNavigate()
    return (
        <div style={{ height: '100%', width: '100%', background: '#efefef' }}>
            <div style={{ margin: 'auto', padding: '0 120px', background: '#efefef', height: '100%' }}>
                <h4 style={{
                    fontWeight: 'normal',
                    margin: '0',
                    padding: '10px'
                }}><span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { navigate('/') }}>Trang chủ </span> - Chi tiết sản phẩm</h4>
                <ProductDetailsComponent idProduct={id} />
            </div >
        </div>
    )
}

export default ProductDetailsPage