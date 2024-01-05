import React, { Fragment, useEffect } from "react";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { alertOption } from "../../../Stores/actions/notificationAction";
import { ClearsErrors, myOrders } from "../../../Stores/actions/orderAction";
import MetaData from "../../metaData/MetaData";
import Loading from "../../Loading/Loading";
import { Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Launch } from "@mui/icons-material";
import AllmyOrders from "./AllmyOrders";

const MyOrders = () => {


    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();


    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            dispatch(ClearsErrors());
        }

        dispatch(myOrders());
    }, [dispatch, error]);
    return (
        <Fragment>
            <MetaData title={`${user.name} - Orders`} />

            {loading ? (
                <Loading />
            ) : (
                <div className="myOrdersPage">
                    {
                        orders && orders.map((item, index) => (
                            <AllmyOrders key={index} item={item} />
                        ))
                    }
                </div>
            )
            }
        </Fragment>
    );
};

export default MyOrders;
