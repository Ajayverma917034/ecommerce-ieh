
import { Box, Typography, styled, TableCell, Table, TableBody, TableRow, Rating, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './productDetails.css'
import './product.css'
import { useDispatch, useSelector } from 'react-redux';
import { newReview } from '../../Stores/actions/productAction';
import { useState } from 'react';
import { alertOption } from '../../Stores/actions/notificationAction';

const ColumnText = styled(TableRow)`
    font-size: 14px;
        vertical-align: baseline;
    &>td{
        font-size: 14px;
        border: none;
    }
`
const ProductDetails = ({ product, id }) => {

    const { user } = useSelector((state) => state.user)

    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));
    let shippingcharge = 0;
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("");
    const dispatch = useDispatch()


    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
        myForm.set("img_url", user.avatar.url)

        dispatch(newReview(myForm));
        setOpen(false);
    }
    const handleToggle = () => {
        if (!user) {
            dispatch(alertOption({ open: true, severity: 'error', message: 'Please login to add a review.' }))
        }
        else {

            setOpen(!open)
        }
    }
    return (
        <>{
            product && <>
                <Typography style={{ marginTop: 5, color: '#878787', fontWeight: 600 }} sx={{ fontSize: { xs: 20, md: 30 } }}>{product.heading}</Typography>
                <Box style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>

                    <Rating name="half-rating-read" value={product.ratings} precision={0.5} readOnly></Rating>
                    {
                        product.reviews &&
                        <Typography style={{ marginTop: 10, color: '#878787', fontSize: 14, paddingLeft: 5 }}>  {product.reviews.length} Reviews</Typography>
                    }
                </Box>
                <Box paddingTop={5}>
                    <Typography component="span" style={{ fontSize: 28 }}>₹{product.price - (product.price * product.discount) / 100}</Typography>&nbsp;&nbsp;&nbsp;
                    <Typography component="span" style={{ color: "#878787" }}><strike>₹{product.price}</strike></Typography>&nbsp;&nbsp;&nbsp;
                    <Typography component="span" style={{ color: "#388e3c" }}>{product.discount}% off</Typography>

                </Box>
                <Divider />
                <p style={{ fontSize: 25, paddingTop: 15, color: '#868787' }}>
                    Status:
                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                </p>
                <Table style={{ marginTop: '30px' }}>
                    <TableBody>
                        <ColumnText>
                            <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                            <TableCell>Deliver by {date.toDateString()} | Shipping Charge - ₹{shippingcharge}</TableCell>
                        </ColumnText>
                        <ColumnText>
                            <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                            <TableCell>1 year Warranty</TableCell>
                        </ColumnText>
                        <ColumnText>
                            <TableCell style={{ color: '#878787' }}>Discription</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </ColumnText>
                    </TableBody>
                </Table>

                <Button onClick={handleToggle}>Submit a review</Button>


                <Dialog
                    open={open}
                    onClose={handleToggle}

                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size="large"
                        />

                        <textarea
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleToggle} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

            </>
        }

        </>
    )
}

export default ProductDetails;