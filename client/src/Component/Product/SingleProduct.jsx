import { Box, Rating, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./singleProduct.css"
import { addEllipsis2 } from '../../utils/ellipse'

const SingleProduct = ({ product }) => {
    const price = Math.round(product.price - (product.discount * product.price) / 100)
    return (
        <Link to={`/product/${product._id}`} className='productCard'
        >
            <Box className="imageBox">
                <img src={product.images[0].url} alt={product.heading} className='imgStyle' />
            </Box>

            <Box className="styleFont">

                <Typography className='productName'>{addEllipsis2(product.heading)}</Typography>

                <Box className="Rating-review-box">
                    <Rating name="half-rating-read" value={product.ratings} precision={0.5} readOnly />
                    <Typography variant='span' margin={'0.5vmax'}  >{product.numOfReviews} Reviews</Typography>
                </Box>
                <Box className="price-box" >
                    <Typography style={{ color: '#ef9273' }} > ₹{price}</Typography>

                    <Typography style={{ color: '#878787' }} > ₹ <strike>{product.price}</strike></Typography>

                    <Typography variant='span' margin={'0.5vmax'} color={'green'} >{product.discount} %off</Typography>
                </Box>


            </Box>

        </Link>
    )
}

export default SingleProduct