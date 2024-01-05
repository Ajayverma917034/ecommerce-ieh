import { Dashboard, ExitToApp, ListAlt, Person, ShoppingCart } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { alertOption } from '../../Stores/actions/notificationAction'
import { logout } from '../../Stores/actions/userAction'


const UserMenu = ({ anchorUserMenu, setAnchorUserMenu, user }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const options = [
        { icon: <ListAlt />, name: "Orders", func: orders },
        { icon: <Person />, name: "Profile", func: account },
        {
            icon: (
                <ShoppingCart
                // style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
                />
            ),
            // name: `Cart(${cartItems.length})`,
            name: 'Cart',
            func: cart,
        },
        { icon: <ExitToApp />, name: "Logout", func: logoutUser },
    ];
    if (user?.role === "admin") {
        options.unshift({
            icon: <Dashboard />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate("/admin/dashboard");
    }

    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function cart() {
        navigate("/cart");
    }
    function logoutUser() {
        dispatch(logout())
        dispatch(alertOption({ open: true, severity: 'success', message: "Logout Successfully" }));
        navigate('/login')
        return;
    }

    // console.log(currentUser)
    const handleCloseMenu = () => {
        setAnchorUserMenu(null)
    }

    return (
        <>
            <Menu
                anchorEl={anchorUserMenu}
                open={Boolean(anchorUserMenu)}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
            >
                {options.map((item) => (
                    <MenuItem onClick={item.func} key={item.name}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        {item.name}
                    </MenuItem>

                ))}
            </Menu>
            {/* <Profile /> */}
        </>
    )
}

export default UserMenu