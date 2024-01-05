import { Typography, Box, Button, styled } from "@mui/material";
import { addEllipsis } from "../../utils/ellipse";
import { useDispatch } from "react-redux";
import { addItmeTocart } from "../../Stores/actions/cartAction";
import './Cart.css'

const Component = styled(Box)`
    border-top: 1px solid #f0f0f0;
    display: flex;
    background: #ffffff;
    justify-content: space-around;
`;
const LeftComponent = styled(Box)`
    
`;
const RightBox = styled(Box)`
    
`;



const CartItem = ({ item, removeItemFromCart }) => {
    const dispatch = useDispatch()

    // const { cartItems } = useSelector((state) => state.cart);


    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItmeTocart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItmeTocart(id, newQty));
    };
    const finalPrice = Math.ceil(item.price - item.price * item.discount / 100)

    return (
        <Component>
            <Box className="leftBox">
                <img src={item.image.url} alt="cartItem" className="cart_img" />
                <div className="cartInput">
                    <button style={{ backgroundColor: '#ef9273' }}
                        onClick={() =>
                            decreaseQuantity(item.product, item.quantity)
                        }
                    >
                        -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button style={{ backgroundColor: '#ef9273' }}
                        onClick={() =>
                            increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                            )
                        }
                    >
                        +
                    </button>
                </div>
            </Box>
            <Box className="right_box">
                <Typography>{addEllipsis(item.heading)}</Typography>
                <Box className="price-box_cart" >
                    <Typography style={{ color: '#ef9273' }} > ₹{finalPrice}</Typography>

                    <Typography style={{ color: '#878787' }} > ₹ <strike>{item.price}</strike></Typography>

                    <Typography variant='span' margin={'0.5vmax'} color={'green'} >{item.discount}% off</Typography>
                </Box>

                {
                    item.quantity && item.quantity > 1 &&
                    <Box style={{ display: 'flex', marginTop: '10px', alignItems: 'center' }} className="quantityAdded">
                        <Typography fontWeight={600}>Total Price : </Typography>
                        <Typography marginLeft={2}>{item.quantity} X {finalPrice} = {item.quantity * finalPrice}</Typography>
                    </Box>
                }
                <Button style={{ backgroundColor: '#ef9273', color: 'white' }} className="remove_btn" onClick={() => removeItemFromCart(item.product)}>Remove</Button>
            </Box>
        </Component>
    )
}

export default CartItem;