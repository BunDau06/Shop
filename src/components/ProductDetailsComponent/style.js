import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px  !important;
    width: 64px  !important;
    
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`

export const WrapperStyleNameProduct = styled.h1`
    // margin: 0px; 
    color: rgb(39, 39, 42);
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    word-break: break-word;
    white-space: break-spaces;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`

export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
`

export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    font-weight: 600;
    line-height: 150%;
    padding: 10px;
    margin-top: 10px;
`

export const WrapperAddressProduct = styled.div`
span.address {
        text-decoration: underline;
        color: rgb(39, 39, 42);
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        width: 100%;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    };
    span.change-address {
        color: rgb(10, 104, 255);
        align-items: center;
        cursor: pointer;
        gap: 4px;
        font-size: 14px;
        font-weight: 400;
        line-height: 150%;
        flex: 1 1 0%;
    }
`

export const WrapperQualtityProduct = styled.div`
    display: flex;
    gap: 4px;
    width: 110px;
    align-items: center;
`

export const WrapperBtnQualtityProduct = styled.span`
    
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 60px;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    };
`

export const WrapContent = styled.div`
        margin: 20px auto;
        margin-bottom: 40px;
        padding: 10px;
        height: 300px;
        border-radius: 20px;
        font-size: 16px;
        white-space: pre-line;
        text-align: justify;
        border: 1px solid #eae7e7;
`

export const ContentDescription = styled.p`
        margin: 2rem 10px;
`


// ant-input-number-input-wrap