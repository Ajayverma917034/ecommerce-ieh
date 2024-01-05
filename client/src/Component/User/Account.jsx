import { Box, Typography } from '@mui/material'
import React from 'react'
import './account.css'
import pof from "../../img/avtarimg.jpg"
import { Link } from 'react-router-dom'

const Account = ({ user }) => {
    return (
        <Box className="mainDivAccount">
            <Box >
                <img src={user && user.avatar.url} alt={user.name} />
            </Box>
            <Box style={{ dispay: 'flex', flexDirection: 'column' }} className="detailBox">
                <Box>
                    <Typography className='heading'>Name :</Typography>
                    <Typography className='heading_desc'>{user && user.name}</Typography>
                </Box>
                <Box>
                    <Typography className='heading'>Email :</Typography>
                    <Typography className='heading_desc'>{user && user.email}</Typography>
                </Box>
                <Box>
                    <Typography className='heading'>Joined On :</Typography>
                    <Typography className='heading_desc'>{String(user && user.createdAt).substr(0, 10)}</Typography>
                </Box>
                <Box className="linktoprofile" style={{ dispay: 'flex', flexDirection: 'column' }}>
                    <Link to="/me/update">Edit Profile</Link>
                    <Link to="/password/update" style={{ margintop: '20px', paddingTop: '20px' }}>Change Password</Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Account