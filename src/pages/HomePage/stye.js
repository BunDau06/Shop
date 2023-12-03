import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;    
    padding: 0px 120px;
    background-color: rgb(239, 239, 239);
    font-weight: 700;

`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: rgb(13, 92, 182);
        span {
            color: #fff;
        }
    }
    boxShadow: " 1px 1px 11px rgba(0, 0, 0, 0.18)",
    width: 100%;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`

export const WrapperProducts = styled.div`
    display: flex; 
    align-Items: center; 
    gap: 14px; 
    margin-Top: 20px;
    flex-Wrap: wrap;
`

export const WrapperInfo = styled.div`
    margin: 0 63px 10px 30px;
    &:nth-child(1) {
        margin-top: 33px;
    }
    &:nth-child(4) {
        margin-bottom: 32px;
    }
`
export const InputInfo = styled.input`
    width: 400px;
    border-radius: 64px;
    height: 50px;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    font-style: italic;
    padding-left: 27px;
    border: rgba(255, 255, 255, 1);
    outline: none;
`

