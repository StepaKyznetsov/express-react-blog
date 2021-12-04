import React from 'react'

const Input = ({value, setValue, placeholder, type}) => {
    return (
        <input
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder={placeholder}
        type={type}
        />
    )
}

export default React.memo(Input)