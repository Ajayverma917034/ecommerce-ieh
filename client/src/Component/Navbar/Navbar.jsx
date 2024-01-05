import * as React from 'react';
import { Close, ShoppingCart } from '@mui/icons-material';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Button, Tooltip, MenuItem, Container, Badge } from '@mui/material'
import logo from "../../img/logo.png"
import Search from '@mui/icons-material/Search';
import SearchBar from './SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserIcon from '../User/UserIcon';

const pages = ['Service', 'Contact', 'About', 'Products'];


const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const { user } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const handleCloseNavMenu = (index) => {

        switch (index) {
            case 0:
                navigate("/service")
                break;

            case 1:
                navigate('/contact')
                break;
            case 2:
                navigate('/about')
                break;
            case 3:
                navigate('/products')
                break;
            default:
                navigate("/")
        }
        setAnchorElNav(null);
    };
    const hadleClick = () => {
        handleCloseNavMenu()
        navigate('/login')
    }
    const handleOpenSearch = () => {
        setOpen(!open)
    }
    const handleNavigateCart = () => {
        navigate('/cart')
    }
    return (
        <AppBar position="sticky">
            <Container maxWidth="xl" style={{ background: '#ef9273', }}
            >
                <Toolbar disableGutters>


                    {/* logo */}
                    <Link to={'/'}>
                        <Tooltip title='India Electronics Hub' >
                            <Box sx={{ cursor: 'pointer' }}>
                                <img src={logo} alt='India Electronic Hub and service center' style={{ width: '50px' }} />
                            </Box>
                        </Tooltip>
                    </Link>

                    {/* nav item for md screen */}

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 'auto', alignItems: 'center' }} >
                        {
                            open && <SearchBar setOpen={setOpen} />
                        }
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenSearch}
                            color="inherit"
                        >{
                                open ? <Close /> : <Search />
                            }

                        </IconButton>
                        {
                            Boolean(user) &&
                            <>
                                <UserIcon user={user} />
                                <Button
                                    sx={{ color: '#fff' }}
                                    style={{ marginRight: 2 }}
                                >
                                    <Badge color="secondary" badgeContent={cartItems && cartItems.length} showZero>

                                        <ShoppingCart onClick={handleNavigateCart} />
                                    </Badge>
                                </Button>
                            </>
                        }
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },

                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={page} onClick={() => handleCloseNavMenu(index)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                            {
                                !Boolean(user) &&
                                <MenuItem onClick={hadleClick} >
                                    <Typography textAlign='center'>Login</Typography>
                                </MenuItem>
                            }
                        </Menu>
                    </Box>

                    {/* nav item for large screen */}




                    <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 'auto', alignItems: 'center' }}>
                        <SearchBar />
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={() => handleCloseNavMenu(index)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                        {
                            Boolean(user) &&
                            <>
                                <UserIcon user={user} />
                                <Button
                                    sx={{ color: '#fff' }}
                                    style={{ marginRight: 2 }}
                                >
                                    <Badge color="secondary" badgeContent={cartItems && cartItems.length} showZero>

                                        <ShoppingCart onClick={handleNavigateCart} />
                                    </Badge>
                                </Button>
                            </>
                        }
                        {
                            !Boolean(user) &&
                            <Button onClick={hadleClick} sx={{ color: '#fff' }}
                                style={{ marginRight: 2 }}>
                                Login
                            </Button>
                        }

                    </Box>



                    {/* user avtar  */}

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
