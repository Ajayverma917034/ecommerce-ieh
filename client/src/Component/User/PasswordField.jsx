import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

const PasswordField = ({ passwordRef, id = 'password', label = 'PassWord' }) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleClicked = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDown = (e) => {
        e.preventDefault();
    }
    return (
        <TextField

            margin='normal'
            variant='standard'
            id={id}
            label={label}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            inputRef={passwordRef}
            inputProps={{ minLength: 6 }}
            required
            width={'100%'}

            InputProps={{

                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleClicked} onMouseDown={handleMouseDown} position={'fixed'}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}

                        </IconButton>

                    </InputAdornment>
                )
            }}
        >

        </TextField>
    )
}

export default PasswordField