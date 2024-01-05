import { Backdrop } from '@mui/material';
import React from 'react'
import './Loading.css'

const Loading = () => {
    return (
        <Backdrop
            open={true}
            sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
        >
            {/* <div className='mainDiv'> */}
            <div className='container'>
                <div className='ring'></div>
                <div className='ring'></div>
                <div className='ring'></div>
                <span className='load'>Loading...</span>
            </div>
            {/* </div> */}
        </Backdrop>
    )
}

export default Loading;
