import React from 'react'
import { logoData } from "../../../constant/carousel.js"
import { Box, styled, Typography } from '@mui/material';
const ImgBar = styled(Box)`
  display:flex;
  alignItems: center;
   justify-content: space-around;
   margin-top: 10px;
   padding: 12px;
  borderRadius: 10px;
  background-color: #fff;
`


const LogoBar = () => {
    return (
        <ImgBar>
            {
                logoData.map((image, index) => (
                    <Box key={index} style={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={image.imgRoot} alt={image.text} style={{ width: '70%', borderRadius: 3, cursor: 'pointer' }} />
                        <Typography
                            sx={{ display: { xs: 'flex', md: 'none', fontSize: '11px', fontWeight: 600, color: '#878787' } }}
                        >{image.text}</Typography>
                        <Typography sx={{ display: { xs: 'none', md: 'flex' }, fontSize: '25px', fontWeight: 600, color: '#878787' }}>{image.text}</Typography>
                    </Box>
                ))
            }
        </ImgBar>
    )
}

export default LogoBar;
