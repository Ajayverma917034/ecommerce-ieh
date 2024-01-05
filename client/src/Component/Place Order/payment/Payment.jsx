import { Payments, PriceChange } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import "../Shipping/shipping.css"
import CheckoutSteps from '../CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { alertOption } from '../../../Stores/actions/notificationAction'
import { createOrder } from '../../../Stores/actions/orderAction'
import './payment.css'

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [disableBtn, setDisableBtn] = useState(false)

    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder)

    const order = {
        shippingInfor: shippingInfo,
        orderItems: cartItems,
        paymentInfo: 'cash on Delivery',
        itemPrice: orderInfo.subtotal,
        taxPrice: 0,
        shippingInfo: orderInfo.deliveryCharge,
        totalPrice: orderInfo.price,
        discount: orderInfo.discount,

    }
    const PaymentDone = () => {
        console.log(order.orderItems)
        setDisableBtn(true)
        dispatch(createOrder(order))
        if (error) {
            setDisableBtn(false)
            dispatch(alertOption({ open: true, severity: "error", message: error }))
            return;
        }
        navigate('/success')
    }

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
        }
    }, [error, dispatch])
    return (
        <Fragment>
            <Container style={{ minHeight: '100vh' }} className="mainPaymentBox">
                <CheckoutSteps activeStep={2} />
                <Typography style={{ fontWeight: 600, fontSize: 28, paddingTop: '20px', textAlign: 'center', width: '200px', margin: '0 auto' }}>Payment</Typography>
                <Box className="paymentBoxTop">


                    <Box className="paymentBox">
                        <Typography style={{ fontWeight: 500, fontSize: 25, }}>Payment Options</Typography>
                        <Box className="SelectBox2" >
                            <Payments />
                            <select

                                required
                                value="cash of Delivery"
                            >
                                <option value="cash of Delivery">cash of Delivery</option>

                            </select>
                        </Box>
                        <Button type='submit' variant='contained' disabled={disableBtn} style={{ backgroundColor: '#ef9273', marginLeft: 20 }} onClick={PaymentDone}>
                            Order
                        </Button>

                    </Box>
                </Box>
            </Container>
        </Fragment>
    )
}

export default Payment