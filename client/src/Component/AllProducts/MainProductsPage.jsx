import { Box, Dialog, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AllProducts from './AllProducts'
import MenuIcon from '@mui/icons-material/Menu';

import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../Stores/actions/productAction'
import { useParams } from 'react-router-dom';
import './AllProducts.css'
import { alertOption } from '../../Stores/actions/notificationAction'
import FilterPage from './FilterPage'
import store from '../../Stores/store'
import { loadUser } from '../../Stores/actions/userAction'
import { Close } from '@mui/icons-material';
const categories = [
    "Laptop",
    "Mobile",
    "TV",
    "Watch",
    "AC"
]

const MainProductsPage = () => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [price, setPrice] = useState([0, 100000])
    const [currentPage, setCurrentPage] = useState(1)
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)
    const { products, error, loading, productsCount, resultPerPage, filteredProductCount } = useSelector((state) => state.products)


    const { keyword } = useParams()
    var count = Math.ceil(filteredProductCount / resultPerPage);
    const handleClick = () => {
        store.dispatch(loadUser())
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            return;
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
        setOpen(false)
    }, [dispatch, keyword, currentPage, error, price, category, ratings])
    return (
        <Box style={{ minHeight: '100vh' }}>
            <Grid container>
                <Grid item md={2} xs={12} sm={12} style={{ padding: '25px 0 0 25px', background: '#fff' }} className='filterGrid'>
                    <FilterPage {...{ price, setPrice, categories, setCategory, ratings, setRatings }} />
                </Grid>
                <Grid item md={10} xs={12}>
                    <Box className='filterPage'>
                        <IconButton size='large' onClick={() => setOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <AllProducts {...{ loading, price, products, count, setCurrentPage, currentPage }} />


                    <Dialog
                        open={open}
                        fullWidth
                        fullScreen
                        onClose={handleClose}
                        style={{ padding: '14px', margin: '0 7px' }}
                    >
                        <Toolbar>
                            <Typography
                                variant='h6'
                                component='h3'
                                sx={{ ml: 2, flex: 1 }}
                            >
                            </Typography>
                            <IconButton color='inherit' onClick={handleClose} >
                                <Close />
                            </IconButton>
                        </Toolbar>

                        <FilterPage {...{ price, setPrice, categories, setCategory, ratings, setRatings, setOpen }} />

                    </Dialog>
                </Grid>

            </Grid>

        </Box>
    )
}

export default MainProductsPage