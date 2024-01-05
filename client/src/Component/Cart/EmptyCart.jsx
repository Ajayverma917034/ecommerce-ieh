import { Box, Typography, styled } from "@mui/material"


const Component = styled(Box)(({ theme }) => ({

    display: 'flex',
    minHeight: '81vh',
    background: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down("md")]: {
        // padding: 12,
    }
}))

const Container = styled(Box)`
    text-align: center; 
    padding-top: 50px;
`




const EmptyCart = () => {
    const imgUrl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';
    return (
        <Component>
            <Container>
                <img src={imgUrl} alt="Empty Cart" style={{ width: '17%' }} />
                <Typography>Your cart is empty!</Typography>
                <Typography>Add items to it now.</Typography>
            </Container>
        </Component>
    )
}

export default EmptyCart;