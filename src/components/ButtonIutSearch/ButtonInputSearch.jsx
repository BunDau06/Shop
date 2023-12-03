import { Button, } from "antd"
import React from "react"
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ButtonInputSearch = (props) => {
    const { size, placeholder, textbutton,
        bordered, backgroundColorInput = '#fff',
        backgroundColorButton = 'rgb(13, 92, 182)',
        colorButton = '#fff',
    } = props
    return (
        <div style={{ display: 'flex', backgroundColor: "#fff" }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput, borderStyle: 'hidden' }}
                {...props}
            />
            <ButtonComponent
                size={size}
                styleButton={{ background: backgroundColorButton, border: !bordered && 'none', borderRadius: 'unset' }}
                icon={<SearchOutlined color={colorButton} style={{ color: colorButton }} />}
                textbutton={textbutton}
                styletextbutton={{ color: colorButton }}
            /* <span style={{ color: colorButton }}>{textbutton}</span> */
            />

        </div>
    )
}

export default ButtonInputSearch