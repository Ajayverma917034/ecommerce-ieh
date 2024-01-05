import { Typography, Box, Button, styled } from "@mui/material";
import { addEllipsis } from "../../../utils/ellipse";


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


const OrderedItems = ({ item }) => {
    // console.log(item)
    const total = Math.ceil(item.quantity * (item.price - item.price * item.discount / 100))
    return (
        <Component padding={'30px 0'}>
            <LeftComponent>
                <img src={item?.image?.url} alt="cartItem" style={{ width: '80px' }} />
                {/* <ButtonGroup quantity={item.quantity} /> */}
            </LeftComponent>
            <RightBox>
                <Typography>{addEllipsis(item.heading)}</Typography>
                <Box style={{ display: 'flex', marginTop: '20px' }}>
                    <Typography>{item.quantity} X {item.price - item.price * item.discount / 100}</Typography>
                    <Typography marginLeft={2} fontWeight={600}>= {total}</Typography>
                </Box>

            </RightBox>
        </Component>
    )
}

export default OrderedItems;