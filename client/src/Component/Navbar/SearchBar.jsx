
import { Box, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css'


const SearchBar = ({ match }) => {
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(keyword.trim() ? `/products/${keyword}` : "/products");
    }

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        // height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    return (
        <Box className="boxStyle">
            <form action="submit" onSubmit={handleSubmit}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <input
                    placeholder='Search...'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </form>
        </Box>
    )
}

export default SearchBar