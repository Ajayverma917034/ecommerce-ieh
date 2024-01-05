import React from 'react'
import "./account.css"
import { Box, Typography } from '@mui/material'

const address = {
    address: 'This is dummy address',
    city: 'Azamgarh',
    pinCode: 223223,
    phoneNo: 9170341853,
    country: "India",
    state: "Uttar paradesh",
}

const Address = () => {
    return (
        <Box className="AddressDiv">
            <Box display={'flex'} flexDirection={'column'}>


                <Box>
                    <Typography fontWeight={600}>Address:</Typography>
                    <Typography>{address.address}</Typography>
                </Box>
                <Box>
                    <Typography fontWeight={600}>City:</Typography>
                    <Typography>{address.city}</Typography>
                </Box>
                <Box>
                    <Typography fontWeight={600}>Pin Code:</Typography>
                    <Typography>{address.pinCode}</Typography>
                </Box>
                <Box>
                    <Typography fontWeight={600}>Contact Number :</Typography>
                    <Typography>{address.phoneNo}</Typography>
                </Box>
                <Box>
                    <Typography fontWeight={600}> State:</Typography>
                    <Typography>{address.state}</Typography>
                </Box>
                <Box>
                    <Typography fontWeight={600}>Country:</Typography>
                    <Typography>{address.country}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Address