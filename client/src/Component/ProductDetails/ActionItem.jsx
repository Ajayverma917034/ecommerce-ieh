
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItmeToOrder, addItmeTocart } from '../../Stores/actions/cartAction';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px',
        alignItem: 'center',
    }

}))

const Image = styled('img')({
    padding: '15px'
});

const StyledButton = styled(Button)(({ theme }) => ({
    width: '48%',
    height: '50px',
    borderRadius: '2px',
    [theme.breakpoints.down('lg')]: {
        width: '45%',
    },
    [theme.breakpoints.down('sm')]: {
        width: '48%',
        fontSize: '12px'
    }

}))



const ActionItem = ({ product, id }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quantity = 1;
    const addtoCartHandler = () => {
        dispatch(addItmeTocart(id, quantity));
        navigate('/cart');
    }

    const buyNow = () => {
        dispatch(addItmeToOrder(id, quantity))
        navigate('/order-shipping');
    }
    return (
        <LeftContainer marginTop={10}>
            <Box style={{ padding: '15px 20px', border: '1px solid #f0f0f0', width: '90%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                {
                    product.images &&
                    <Image src={product.images[0].url} alt="product" style={{ width: '22vmax' }} />
                }
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', width: '98%' }} className="buy_Add_btn">
                <StyledButton variant='contained' sx={{ marginRight: { xs: 0, md: '15px' } }} onClick={addtoCartHandler} disabled={product.Stock < 1}
                >

                    <Cart />Add to cart</StyledButton>
                <StyledButton variant='contained' onClick={() => buyNow()} style={{ background: '#fb541b' }}
                    disabled={product.Stock < 1}><Flash /> Buy now</StyledButton>
            </Box>
        </LeftContainer>
    )
}

export default ActionItem;