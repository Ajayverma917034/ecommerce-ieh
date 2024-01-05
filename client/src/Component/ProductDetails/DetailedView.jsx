
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, styled } from '@mui/material';
import './product.css'
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../Stores/actions/productAction";
import ActionItem from "./ActionItem";
import ProductDetails from "./ProductDetails";
import Loading from "../Loading/Loading"
import { alertOption } from "../../Stores/actions/notificationAction";
import MetaData from "../metaData/MetaData";
import DetailsDummy from "../LoadingPage/DetailsDummy";
import { NEW_REVIEW_RESET } from "../../Stores/constants/productContants";
import ReviewCard from "./ReviewCard";

const Component = styled(Box)`
background: #f2f2f2;
min-height: 81.2vh;

`


const Container = styled(Grid)(({ theme }) => ({
    display: 'flex',
    background: 'white',
    [theme.breakpoints.down('lg')]: {
        justifyContent: 'center'
    }
}))
const RightContainer = styled(Grid)`
    margin-top: 100px;
    padding-left: 14px;
`
const DetailedView = () => {
    const { id } = useParams()

    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview)

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
        }
        if (reviewError) {
            dispatch(alertOption({ open: true, severity: 'error', message: reviewError }))
        }
        if (success) {
            dispatch(alertOption({ open: true, severity: 'success', message: "Review Submitted Successfully" }));
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, success, reviewError])

    return (
        <>
            {
                loading ? <>
                    <Loading />
                    <DetailsDummy />
                </> :

                    <Box>
                        {
                            product &&
                            <>
                                <Container container >
                                    <MetaData title={`${product.heading} - IEH`} />
                                    <Grid item lg={6} md={4} sm={8} xs={12}>
                                        <ActionItem product={product} id={id} />
                                    </Grid>
                                    <RightContainer item lg={6} md={8} sm={4} xs={12}>
                                        <ProductDetails product={product} id={id} />
                                    </RightContainer>

                                </Container>
                                <Box className="Reviews">
                                    <Typography >Reviews</Typography>
                                    <Box className="reviewBox1">


                                        {
                                            product.reviews && product.reviews.map((review, index) => (
                                                <ReviewCard review={review} key={index} />
                                            ))
                                        }
                                    </Box>

                                </Box>
                            </>
                        }
                    </Box>
            }

        </>
    )
}

export default DetailedView;

