import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import Loading from "../Loading/Loading";
import MetaData from "../metaData/MetaData";
import { Box, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, MenuItem } from "@mui/material";
import Account from "./Account.jsx"
import Address from "./Address.jsx"
import ProfileCart from "./ProfileCart.jsx"
import ProfileOrders from "./ProfileOrders.jsx"
import { Menu } from "@mui/icons-material";
import Sidebar from "./SideBar.jsx";

const Profile = () => {
    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false)

    const data = ["Account", "Address", "My Cart", "My Order"]


    const [field, setField] = useState(0)

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
            return;
        }
        window.scrollTo(0, 0)
    }, [isAuthenticated,]);
    return (
        <Fragment>
            {loading ? (
                <Loading />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />
                    <Grid container style={{ minHeight: '95vh', background: '#fef9f8', justifyContent: 'space-between' }} >
                        <Grid item xs={0} sm={2} md={2} lg={2} style={{ minHeight: '95vh', }} className="menu_icon_box">

                            {
                                data.map((item, index) => (
                                    <ListItem disablePadding key={item} onClick={() => setField(index)}>
                                        <ListItemButton>
                                            <ListItemText primary={item} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }

                        </Grid>
                        <Grid item sm={10} md={10} lg={10} style={{ minHeight: '95vh', }} className="details_user">
                            <Box className="menu_icon_toggle" >
                                <IconButton size='large' color='inherit' onClick={() => setIsOpen(true)}>
                                    <Menu />
                                </IconButton>
                            </Box>
                            <Sidebar {...{ isOpen, setIsOpen, setField, data }} />
                            <Box style={{ background: "#fff", margin: '10px', minHeight: '95vh ' }}>

                                {
                                    field === 0 && <Account user={user} />
                                }
                                {
                                    field === 1 && <Address />
                                }
                                {
                                    field === 2 && <ProfileCart />
                                }
                                {
                                    field === 3 && <ProfileOrders />
                                }
                            </Box>
                        </Grid>

                    </Grid>

                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;

