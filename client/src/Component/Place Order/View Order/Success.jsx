import { CheckCircle } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./success.css"

const Success = () => {
    return (
        <Box className="BoxContainer">
            <CheckCircle />
            <Typography>Your Order has been place successfully</Typography>
            <Link to='/orders'>View Order</Link>
            <Typography>Our Team Will contact You Soon</Typography>
        </Box>
    )
}

export default Success