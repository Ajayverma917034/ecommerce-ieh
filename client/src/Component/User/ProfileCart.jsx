import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { removeItemsFromCart } from '../../Stores/actions/cartAction';
import CartItem from '../Cart/CartItem';
import TotalBalance from '../Cart/TotalBalance';
import { Box } from '@mui/material';
import EmptyCart from '../Cart/EmptyCart';

const ProfileCart = () => {
    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const deleteCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
    }
    const checkOutHandler = () => {
        navigate('/shipping');
    }
    return (
        <Box>
            {
                cartItems.length === 0 ? <EmptyCart /> : <>
                    <Box>
                        {
                            cartItems && cartItems.map((item, index) => (
                                <CartItem item={item} key={index} removeItemFromCart={deleteCartItem} />
                            ))
                        }
                    </Box>
                    <Box>{

                        cartItems && <TotalBalance cartItems={cartItems} />
                    }
                    </Box>
                </>
            }

        </Box>
    )
}

export default ProfileCart