import { Launch } from "@mui/icons-material";
import { Typography, Box, Button, styled } from "@mui/material";
import { addEllipsis } from "../../../utils/ellipse";
import { Link } from "react-router-dom";


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


const AllmyOrders = ({ item }) => {
    return (
        <Component>
            <LeftComponent>
                {item._id}
            </LeftComponent>
            <RightBox>
                <Typography>{item.orderStatus}</Typography>
                <Box style={{ marginTop: 10, display: 'flex' }}>
                    <Box component="span" style={{ fontSize: 20, fontWeight: 600 }}>{item.totalPrice - item.discount}</Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: "#878787" }}></Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: "#388e3c" }}></Box>
                </Box>
                <Link to={`/order/${item._id}`}>
                    <Launch />

                </Link>
            </RightBox>
        </Component>
    )
}

export default AllmyOrders;