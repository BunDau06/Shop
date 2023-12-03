import { Input } from "antd"
import React, { useState } from "react"
import { WrapperInputStyle } from "./style"

const InputForm = (props) => {
    // const [valueInput, setValueInput] = useState('')
    const { placeholder = 'Nhập text', ...rests } = props
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
    }
    return(
        <div>
            <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput} />
        </div>
    )
}

export default InputForm