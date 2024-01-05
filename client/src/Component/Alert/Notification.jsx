import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alertOption } from '../../Stores/actions/notificationAction'

const Notification = () => {
    const dispatch = useDispatch()
    const { alert } = useSelector((state) => state.alert)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        dispatch(alertOption({ open: false, severity: 'info', message: "" }))

    }

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity={alert.severity}
                sx={{ width: '100%' }}
                variant="filled"
                elevation={6}
            >
                {alert.message}


            </Alert>


        </Snackbar>
    )
}

export default Notification