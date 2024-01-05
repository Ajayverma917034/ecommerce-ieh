import React, { Fragment, useEffect } from 'react'
import NavB from './Carousel/CarouselBar'
import { Box, Typography } from '@mui/material'
import LogoBar from './LogoBar/LogoBar'
import Products from '../Product/Products'
import MetaData from '../metaData/MetaData'
import { getProduct } from "../../Stores/actions/productAction.js"
import './product.css'
import { useSelector, useDispatch } from "react-redux"
import Loading from '../Loading/Loading'
import { alertOption } from '../../Stores/actions/notificationAction'
import HomeDummy from '../LoadingPage/HomeDummy'
import Contact from '../ContactUs/Contact'
import Services from '../Services/Services'

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products)
    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            return;
        }
        dispatch(getProduct())
    }, [dispatch, error])

    return (
        <Fragment>
            {
                loading ?
                    <>

                        <HomeDummy />
                        <Loading />
                    </>
                    :
                    <>

                        <Box sx={{ padding: { xs: '20px 10px', md: '20px 40px', display: 'flex', flexDirection: 'column' } }}>
                            <MetaData title={"IEH"} />
                            <NavB />
                            <Box style={{ alignItems: 'center', textAlign: 'center', backgroundColor: '#fff', borderRadius: '10px', marginTop: '10px' }}>
                                {/* <Typography fontSize={40} fontWeight={600} color={'#2c0ca3d9'} backgroundColor={'#fff'}>  Our Services</Typography> */}
                                <LogoBar />

                            </Box>
                            <Box className="productBox">
                                <Typography >Our Products</Typography>
                            </Box>
                            <Products products={products} />
                            <Contact />
                            <Services />
                        </Box>
                    </>

            }
        </Fragment>
    )
}

export default Home