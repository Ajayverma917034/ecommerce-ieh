import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleOrder from "./SingleOrder.jsx"
import { alertOption } from '../../Stores/actions/notificationAction.js'
import { ClearsErrors, myOrders } from '../../Stores/actions/orderAction.js'

const ProfileOrders = () => {
    const { orders, error, loading } = useSelector((state) => state.myOrders)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    console.log(orders)
    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            dispatch(ClearsErrors());
        }

        dispatch(myOrders());
    }, [dispatch, error, user]);
    return (
        <Box>
            {
                orders.map((item, index) => (
                    <SingleOrder item={item} key={index} />
                ))
            }
        </Box>
    )
}

export default ProfileOrders