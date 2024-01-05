import { TextField } from '@mui/material';
import React, { useState } from 'react';


let timer;
const InfoField = ({ PassValue, fieldName, setPassValue, minLength = 2, Rows = 1, Type = 'text', placeHolderValue }) => {
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setPassValue(e.target.value)
        if (!editing) setEditing(true);
        clearTimeout(timer);
        timer = setTimeout(() => {
            setEditing(false);
            if (e.target.value.length < minLength) {
                if (!error) setError(true);
                if (success) setSuccess(false);
            } else {
                if (error) setError(false);
                if (!success) setSuccess(true);
            }
        }, 1000);
    };
    return (

        <TextField
            error={error}
            color={success ? 'primary' : 'primary'}
            helperText={error && `This field must be ${minLength} characters or more`}
            id="outlined-textarea"
            label={fieldName}
            placeholder={placeHolderValue}
            multiline
            type={Type}
            value={PassValue}
            onChange={handleChange}
            required
            fullWidth
            rows={Rows}

        />
    );
};

export default InfoField;