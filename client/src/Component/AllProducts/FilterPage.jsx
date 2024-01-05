import { Box, Divider, Rating, Slider, Typography } from '@mui/material'
import React from 'react'

const FilterPage = ({ price, setPrice, categories, setCategory, ratings, setRatings }) => {

    const pricHandle = (event, newPrice) => {
        setPrice(newPrice)
    }
    return (
        <Box className='Filter-box'>
            <Typography className='filterHeading'>Apply Filters</Typography>
            <Box className="priceFilter">
                <Typography className='priceFilterHeading'> Price</Typography>

                <Slider
                    value={price}
                    onChange={pricHandle}
                    min={0}
                    max={70000}
                    step={1000}
                    valueLabelDisplay="auto"
                    aria-labelledby='range-slider'
                    style={{ color: '#ef9273' }}
                    className='rangeFilter'
                />
                <Box className="rangePrice">
                    <Typography>Min- ₹{price[0]}</Typography>
                    <Typography>Max- ₹{price[1]}</Typography>
                </Box>

            </Box>
            <Box className='categoryFilter'>
                <Typography className='categoryFilterHeading'> Category</Typography>
                <ul className='categoryBox'>

                    {
                        categories && categories.map((category) => (
                            <li key={category} className='category-link' onClick={() => setCategory(category)}>
                                <Typography>{category}</Typography>
                            </li>
                        ))

                    }

                </ul>
            </Box>
            <Box className='ratingFilter'>
                <Typography className='ratingFilterHeading'>Ratings</Typography>
                <Rating
                    className='starBox'
                    name="simple-controlled"
                    value={ratings}
                    onChange={(event, newValue) => {
                        setRatings(newValue);
                    }}
                />
            </Box>
        </Box>
    )
}

export default FilterPage