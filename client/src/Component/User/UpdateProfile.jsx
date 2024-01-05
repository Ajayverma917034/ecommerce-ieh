import { Face, MailOutline, Send } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { ClearsErrors, loadUser, updateProfile } from '../../Stores/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../Stores/constants/userConstant';
import './updateProfile.css'
import { alertOption } from '../../Stores/actions/notificationAction';
import avtarimg from "../../img/avtarimg.jpg"
const UpdateProfile = () => {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);
    const navigate = useNavigate()

    const updateProfileSubmit = (e) => {

        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));

    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            dispatch(alertOption({ open: true, severity: "error", message: error }))
            dispatch(ClearsErrors());
        }

        if (isUpdated) {
            dispatch(alertOption({ open: true, severity: "success", message: 'Your profile updated successfully' }))
            dispatch(loadUser());

            navigate("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, user, isUpdated]);
    return (
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Box className="updateFormDesign">


                <form onSubmit={updateProfileSubmit}>
                    <Box dividers>
                        <Typography style={{ fontWeight: 600, color: '#03d2ff', fontSize: '30px', textAlign: 'center' }}>Update Profile</Typography>

                        <TextField
                            margin='normal'
                            variant='standard'
                            id='name'
                            label='Name'
                            type='text'
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            inputProps={{ minLength: 2 }}
                            required
                        />
                        <TextField
                            margin='normal'
                            variant='standard'
                            id='name'
                            label='Name'
                            type='text'
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            inputProps={{ minLength: 2 }}
                            required
                        />
                        <div id="updateProfileImage">
                            <img src={avatarPreview} alt="Avatar Preview" style={{ width: '60px' }} />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProfileDataChange}
                            />
                        </div>

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

export default UpdateProfile