import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import "../Place Order/ConfirmOrder/confirmOrder.css"
import { Box, Button, Grid, Typography, styled } from '@mui/material'
import CheckoutSteps from '../Place Order/CheckoutSteps'
import MetaData from '../metaData/MetaData'
import { addEllipsis } from '../../utils/ellipse'



const Component = styled(Box)`
    border-top: 1px solid #f0f0f0;
    display: flex;
    background: #ffffff;
`;
const LeftComponent = styled(Box)`
    margin: 20px;
    display: flex;
    flex-direction: column;
`;
const RightBox = styled(Box)`
    margin-top: 20px;
`;


const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0; 
`
const Heading = styled(Typography)`
    color: #878787;
`

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    &>p{
        margin-bottom: 20px;
        font-size: 14px; 
    }
`
const Price = styled(Box)`
    float: right;
`

const OrderButtonConfirm = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user)
    const { ordersAdd } = useSelector((state) => state.ordersAdd);
    const { shippingInfo } = useSelector((state) => state.cart);

    const total = Math.ceil(ordersAdd.quantity * (ordersAdd.price - ordersAdd.price * ordersAdd.discount / 100))
    const deliveryCharge = total > 1000 ? 0 : 50;
    const subtotal = total + deliveryCharge;
    const { price, discount } = ordersAdd;
    const hadleproceedTopayment = () => {
        const data = {
            price,
            discount,
            deliveryCharge,
            subtotal
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/order-payment");
    }
    return (

        <Fragment>
            <MetaData title="Confirm Order" />
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
                            ordersAdd &&
                            <Component padding={'30px 0'}>
                                <LeftComponent>
                                    <Link to={`/product/${ordersAdd.product}`}>
                                        <img src={ordersAdd?.image?.url} alt="cartItem" style={{ width: '80px' }} />

                                    </Link>
                                    {/* <ButtonGroup quantity={item.quantity} /> */}
                                </LeftComponent>
                                <RightBox>
                                    <Typography>{addEllipsis(ordersAdd.heading)}</Typography>
                                    <Box style={{ display: 'flex', marginTop: '20px' }}>
                                        <Typography>{ordersAdd.quantity} X {total}</Typography>
                                        <Typography marginLeft={2} fontWeight={600}>= {total}</Typography>
                                    </Box>

                                </RightBox>
                            </Component>

                        }
                    </Box>
                </Grid>

                {/* for order payment */}
                <Grid item xs={12} sm={12} md={4} lg={3}>
                    <Box className="totalPrice">
                        <Header>
                            <Heading>PRICE DETAILS</Heading>
                        </Header>
                        <Container>
                            <Typography>price (1 item)
                                <Price component="span">₹ {ordersAdd.price}</Price>
                            </Typography>
                            <Typography>Discount
                                <Price component="span">- ₹ {ordersAdd.discount}%</Price>
                            </Typography>
                            <Typography>Delivary Charge
                                <Price component="span">₹ {deliveryCharge}</Price>
                            </Typography>
                            <Typography>Total Amount
                                <Price component="span">₹{total + deliveryCharge} </Price>
                            </Typography>
                            <Typography>You save ₹{ordersAdd.price + ordersAdd.discount - deliveryCharge} on this order</Typography>
                        </Container>

                        <Button type='submit' variant='contained' style={{ backgroundColor: '#ef9273', marginLeft: 20 }} onClick={hadleproceedTopayment}>
                            Continue
                        </Button>
                    </Box>
                </Grid>

            </Grid>
        </Fragment>
    )
}

export default OrderButtonConfirm