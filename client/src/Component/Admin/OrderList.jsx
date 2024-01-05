import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { alertOption } from "../../Stores/actions/notificationAction";
import { DataGrid } from '@mui/x-data-grid';
import SideBar from "./Sidebar";
import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ClearsErrors, deleteOrder, getAllOrders, } from "../../Stores/actions/orderAction"
import { DELETE_ORDER_RESET } from "../../Stores/constants/orderConstant";
import MetaData from "../metaData/MetaData";



const OrderList = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const { error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            dispatch(ClearsErrors());
        }

        if (deleteError) {
            dispatch(alertOption({ open: true, severity: 'error', message: deleteError }))
            dispatch(ClearsErrors());
        }

        if (isDeleted) {
            dispatch(alertOption({ open: true, severity: 'success', message: "Order Deleted Successfully" }))
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                const { id } = params.row;
                return (id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.4,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const { id } = params.row;
                return (
                    <Fragment>
                        <Link to={`/admin/order/${id}`}>
                            <Edit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteOrderHandler(id)
                            }
                        >
                            <Delete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default OrderList;