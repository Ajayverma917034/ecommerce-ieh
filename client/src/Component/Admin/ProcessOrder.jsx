import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./processOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ORDER_RESET } from "../../Stores/constants/orderConstant";
import { ClearsErrors, getOrderDetails, updateOrder } from "../../Stores/actions/orderAction";
import MetaData from "../metaData/MetaData";
import Sidebar from "./Sidebar";
import Loading from "../Loading/Loading";
import { Button, Typography } from "@mui/material";
import { AccountTree } from "@mui/icons-material";
import { alertOption } from "../../Stores/actions/notificationAction";

const ProcessOrder = () => {
    const { id } = useParams()
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);
    console.log(order)
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
    };

    const dispatch = useDispatch();

    const [status, setStatus] = useState("");

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            dispatch(ClearsErrors());
        }
        if (updateError) {
            dispatch(alertOption({ open: true, severity: 'error', message: updateError }))
            dispatch(ClearsErrors());
        }
        if (isUpdated) {
            dispatch(alertOption({ open: true, severity: 'success', message: "Order Updated Successfully" }))
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, error, id, isUpdated, updateError]);

    return (
        <Fragment>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div
                            className="confirmOrderPage"
                            style={{
                                display: order.orderStatus === "Delivered" ? "block" : "grid",
                            }}
                        >
                            <div>
                                {
                                    order &&
                                    <div className="confirmshippingArea">
                                        <Typography>Shipping Info</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                <p>Name:</p>
                                                <span>{order.user && order.user.name}</span>
                                            </div>
                                            <div>
                                                <p>Phone:</p>
                                                <span>
                                                    {order.shippingInfor && order.shippingInfor.phoneNo}
                                                </span>
                                            </div>
                                            <div>
                                                <p>Address:</p>
                                                <span>
                                                    {order.shippingInfor &&
                                                        `${order.shippingInfor.address}, ${order.shippingInfor.city}, ${order.shippingInfor.state}, ${order.shippingInfor.pinCode}, ${order.shippingInfor.country}`}
                                                </span>
                                            </div>
                                        </div>

                                        <Typography>Payment</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                {/* <p
                                                className={
                                                    order.paymentInfo &&
                                                        order.paymentInfo.status === "succeeded"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"}
                                            </p> */}
                                            </div>

                                            <div>
                                                <p>Amount:</p>
                                                <span>{order.totalPrice && order.totalPrice}</span>
                                            </div>
                                        </div>

                                        <Typography>Order Status</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                <p
                                                    className={
                                                        order.orderStatus && order.orderStatus === "Delivered"
                                                            ? "greenColor"
                                                            : "redColor"
                                                    }
                                                >
                                                    {order.orderStatus && order.orderStatus}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    order.orderItems &&

                                    <div className="confirmCartItems">
                                        <Typography>Your Cart Items:</Typography>
                                        <div className="confirmCartItemsContainer">
                                            {order.orderItems &&
                                                order.orderItems.map((item) => (
                                                    <div key={item.product}>
                                                        <img src={item.image.url} alt="Product" />
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.heading}
                                                        </Link>{" "}
                                                        <span>
                                                            {item.quantity} X ₹{item.price} ={" "}
                                                            <b>₹{item.price * item.quantity}</b>
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                }
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    display: order.orderStatus === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Process Order</h1>

                                    <div>
                                        <AccountTree />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={
                                            loading ? true : false || status === "" ? true : false
                                        }
                                    >
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;