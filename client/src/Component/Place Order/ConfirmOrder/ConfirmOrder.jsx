import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./confirmOrder.css"
import { Box, Button, Checkbox, Grid, Typography } from '@mui/material'
import OrderedItems from './OrderedItems'
import TotalBalance from '../../Cart/TotalBalance'
import CheckoutSteps from "../CheckoutSteps"
const ConfirmOrder = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user)
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);

    let price = 0, discount = 0;
    cartItems && cartItems.map(item => {
        price += item.price;
        discount += (item.price * item.discount / 100);
    });
    const deliveryCharge = price - discount > 1000 ? 0 : 50;
    const subtotal = price - discount + deliveryCharge;

    const hadleproceedTopayment = () => {
        const data = {
            price,
            discount,
            deliveryCharge,
            subtotal
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment");
    }
    return (
        <Fragment>
            <metadata title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <Grid container className="mainGrid">
                <Grid item sm={12} md={8} lg={9} className='addressGrid'>
                    <Box className="addressBox">
                        <Typography style={{ fontWeight: 600, fontSize: '25px', marginBottom: '10px' }}>Delivery Details</Typography>
                        <Box>
                            <Typography>Name: </Typography>
                            <Typography marginLeft={'10px'}>{user.name} </Typography>

                        </Box>
                        <Box>
                            <Typography>Contact Number :  </Typography>
                            <Typography marginLeft={'10px'}>{shippingInfo.phoneNo} </Typography>

                        </Box>
                        <Box>
                            <Typography>Address :  </Typography>
                            <Typography marginLeft={'10px'}> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.pinCode}, {shippingInfo.state} , {shippingInfo.country} </Typography>

                        </Box>

                    </Box>
                    <Box className="CartItemsBox">
                        <Typography style={{ fontWeight: 600, fontSize: '25px', margin: '10px' }}>Your Item</Typography>
                        {
                            cartItems && cartItems.map((item, index) => (

                                <OrderedItems item={item} key={index} />
                            ))
                        }
                    </Box>
                </Grid>

                {/* for order payment */}
                <Grid item xs={12} sm={12} md={4} lg={3}>
                    <Box className="totalPrice">
                        <TotalBalance cartItems={cartItems} />

                        <Button type='submit' variant='contained' style={{ backgroundColor: '#ef9273', marginLeft: 20 }} onClick={hadleproceedTopayment}>
                            Continue
                        </Button>
                    </Box>
                </Grid>

            </Grid>
        </Fragment>
    )
}

export default ConfirmOrder