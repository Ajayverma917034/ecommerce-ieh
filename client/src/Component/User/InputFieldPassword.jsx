import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField, styled } from '@mui/material'
import React, { useState } from 'react'


const CssTextField = styled(TextField, {
    shouldForwardProp: (props) => props !== "focusColor"
})((p) => ({
    // input label when focused
    "& label.Mui-focused": {
        color: p.focusColor
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
        borderBottomColor: p.focusColor
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
        borderBottomColor: p.focusColor
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: p.focusColor
        }
    }
}));

const InputFieldPassword = ({ PassValue, fieldName, PlaceHolder, setPassValue, }) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleClick = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDown = (e) => {
        e.preventDefault();
    }
    return (
        <CssTextField
            margin='normal'
            focusColor='#ef9273'
            variant='standard'
            placeholder={PlaceHolder}
            label={fieldName}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            name='password'
            value={PassValue}
            onChange={(e) => setPassValue(e.target.value)}
            inputProps={{ minLength: 6 }}
            required
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

export default InputFieldPassword