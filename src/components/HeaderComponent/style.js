import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 0;
    // background-color: rgb(26, 148, 255);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
    // background-image: linear-gradient(to right, #434343 0%, black 100%);
`

export const WrapperTextHeader = styled(Link)`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    
`

export const WrapperHeaderAccout = styled.div`
    color: #fff;
    display: flex;
    gap: 10px;
    align-items: center;

`

export const WrapperHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`


