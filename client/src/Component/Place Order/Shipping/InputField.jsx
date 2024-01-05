import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

const InputField = ({ PassValue, fieldName, id, setPassValue, minLength = 2, startIcon, Type = 'text' }) => {

    return (
        <TextField
            margin='normal'
            variant='standard'
            id={id}
            // label={fieldName}
            type={Type}
            fullWidth
            placeholder={fieldName}
            value={PassValue}
            onChange={(e) => setPassValue(e.target.value)}
            inputProps={{ minLength: minLength }}
            required
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <IconButton >
                            {startIcon}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

export default InputField