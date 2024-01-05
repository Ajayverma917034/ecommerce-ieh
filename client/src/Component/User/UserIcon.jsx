import { Avatar, Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import UserMenu from './UserMenu'

const UserIcon = ({ user }) => {

    const [anchorUserMenu, setAnchorUserMenu] = React.useState(null)
    return (

        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
                <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)} sx={{ p: 0 }}>
                    <Avatar alt={user?.name} src={user?.avatar?.url} >
                        {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <UserMenu {...{ anchorUserMenu, setAnchorUserMenu, user }} />
        </Box>

    )
}

export default UserIcon