import { Box, Grid, ListItem, MenuItem } from '@mui/material'
import React from 'react'
const data = ["Account", "Password Change", "Address", "My Cart", "My Order"]

const UpdateProfile2 = () => {
    return (
        <Grid container style={{ minHeight: '90vh', background: '#878787', justifyContent: 'space-between' }}>
            <Grid item sm={12} md={2} lg={2} style={{ height: '95vh', }}>
                <Box style={{ background: "#fff", margin: '10px', height: '95vh' }}>

                    {
                        data.map((item) => (
                            <MenuItem>
                                <ListItem>
                                    {item}
                                </ListItem>
                            </MenuItem>
                        ))
                    }
                </Box>

            </Grid>

            <Grid item sm={12} md={10} lg={10} style={{ height: '95vh', }}>

                <Box style={{ background: "#fff", margin: '10px', height: '95vh ' }}>
                </Box>
            </Grid>

        </Grid>
    )
}

export default UpdateProfile2