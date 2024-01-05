

import { Box, createTheme, ThemeProvider } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import React from 'react'

const dartTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#ef9273',
        },
    },
})

const CustomPagination = ({ count, setCurrentPage, currentPage }) => {
    const handlePageChange = (page) => {

        setCurrentPage(page);
        window.scroll(0, 0)
    }
    return (
        < Box
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
            }}
        >
            <ThemeProvider theme={dartTheme}>
                {
                    <Pagination count={Number.isInteger(count) ? count : 0} onChange={(e) => handlePageChange(e.target.textContent)}
                        hideNextButton
                        hidePrevButton
                        color='primary'
                        page={currentPage}
                    />
                }
            </ThemeProvider>
        </Box >
    )
}

export default CustomPagination