import { Box, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";



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

const TotalBalance = ({ cartItems }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        totalAmount();
        // eslint-disable-next-line
    }, [cartItems,])

    const totalAmount = () => {
        let price = 0, discount = 0;
        cartItems && cartItems.map(item => {
            price += item.price * item.quantity;
            discount += (item.price * item.discount / 100) * (item.quantity);
        });
        setPrice(price);
        setDiscount(discount);
    }

    const deleiveryCharge = price - discount > 1000 ? 0 : 50;

    return (
        <Box>
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>price ({cartItems?.length} item)
                    <Price component="span">₹ {price}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">- ₹ {discount}</Price>
                </Typography>
                <Typography>Delivary Charge
                    <Price component="span">₹ {deleiveryCharge}</Price>
                </Typography>
                <Typography>Total Amount
                    <Price component="span">₹{price - discount + deleiveryCharge} </Price>
                </Typography>
                <Typography>You save ₹{discount - deleiveryCharge} on this order</Typography>
            </Container>
        </Box>
    )
}

export default TotalBalance;