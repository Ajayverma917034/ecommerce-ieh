
import { ChevronLeft } from '@mui/icons-material'
import { Drawer, IconButton, styled, Typography, Box, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}))

const Sidebar = ({ isOpen, setIsOpen, setField, data }) => {
    const handleClick = (index) => {
        setField(index)
        setIsOpen(false)
        window.scrollTo(0, 0)
    }
    return (
        <Drawer
            variant='persistent'
            hideBackdrop={true}
            open={isOpen}

        >
            <DrawerHeader>
                <Typography>Options : </Typography>
                <IconButton onClick={() => setIsOpen(false)}>
                    <ChevronLeft fontSize='large' />
                </IconButton>
            </DrawerHeader>

            {
                data.map((item, index) => (
                    <ListItem disablePadding key={item} onClick={() => handleClick(index)}>
                        <ListItemButton>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </Drawer>
    )
}

export default Sidebar