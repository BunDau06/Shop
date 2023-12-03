import { Button, Col } from "antd";
import styled from "styled-components";

export const WrapperProducts = styled.div`
    display: flex; 
    gap: 15px; 
    align-Items: center;
    margin-Top: 20px;
    flex-Wrap: wrap;
`

export const WrapperNavbar = styled(Col)`
    background: #fff;
    margin-Right: 10px;
    padding: 10px;
    border-Radius: 4px;
    height: fit-content;
    margin-Top: 20px;
    padding-top: 0;
    width: 200px;
`
export const WrapButton = styled(Button)`
    margin-top: 10px;
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