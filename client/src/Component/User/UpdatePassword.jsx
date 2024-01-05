import { Send, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './updateProfile.css'
import { alertOption } from '../../Stores/actions/notificationAction';
import { UPDATE_PROFILE_RESET } from '../../Stores/constants/userConstant';
import { ClearsErrors, loadUser, updatePassword } from '../../Stores/actions/userAction';
import InputFieldPassword from './InputFieldPassword';
const UpdatePassword = () => {

    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const handleClick = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDown = (e) => {
        e.preventDefault();
    }
    const navigate = useNavigate()

    const passwordSubmitSubmit = (e) => {

        e.preventDefault();

        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm))

    };

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: "error", message: error }))
            dispatch(ClearsErrors());
        }

        if (isUpdated) {
            dispatch(alertOption({ open: true, severity: "success", message: 'Your Password has been updated' }))
            dispatch(loadUser());

            navigate("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, isUpdated]);
    return (
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Box className="updateFormDesign">


                <form onSubmit={passwordSubmitSubmit}>
                    <Box dividers>
                        <Typography style={{ fontWeight: 600, color: '#03d2ff', fontSize: '30px', textAlign: 'center' }}>Update Profile</Typography>

                        <InputFieldPassword PassValue={oldPassword} fieldName={'Old Password'} id={'oldPassword'} setPassValue={setoldPassword} />

                        <InputFieldPassword PassValue={newPassword} fieldName={'New Password'} id={'newPassword'} setPassValue={setnewPassword} />

                        <InputFieldPassword PassValue={confirmPassword} fieldName={'Confirm New Password'} id={'confirmPassword'} setPassValue={setConfirmPassword} />
                    </Box>
                    <Box sx={{ marginTop: '10px' }}>
                        <Button style={{ backgroundColor: '#ef9273' }} type='submit' variant='contained' endIcon={<Send />}>
                            submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default UpdatePassword