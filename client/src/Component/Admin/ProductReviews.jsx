import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClearsErrors, deleteReviews, getAllReviews } from "../../Stores/actions/productAction";
import { alertOption } from "../../Stores/actions/notificationAction";
import { DELETE_REVIEW_RESET } from "../../Stores/constants/productContants";
import { Button } from "@mui/material";
import { Delete, Star } from "@mui/icons-material";
import MetaData from "../metaData/MetaData";
import Sidebar from "./Sidebar";


const ProductReviews = () => {
    // const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.review
    );

    const { error, reviews, loading } = useSelector(
        (state) => state.productReviews
    );

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {
        console.log(reviewId)
        dispatch(deleteReviews(reviewId, productId));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            dispatch(ClearsErrors());
        }

        if (deleteError) {
            dispatch(alertOption({ open: true, severity: 'error', message: deleteError }))
            dispatch(ClearsErrors());
        }

        if (isDeleted) {
            dispatch(alertOption({ open: true, severity: 'success', message: "Review Deleted Successfully" }))
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, error, deleteError, navigate, isDeleted, productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },

        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,

            cellClassName: (params) => {
                const { id } = params;
                return (id, "rating") >= 3
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const { id } = params;
                // console.log(id)
                return (
                    <Fragment>
                        <Button
                            onClick={() =>
                                deleteReviewHandler(id)
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

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL REVIEWS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productReviewsContainer">
                    <form
                        className="productReviewsForm"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                                loading ? true : false || productId === "" ? true : false
                            }
                        >
                            Search
                        </Button>
                    </form>

                    {reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                    ) : (
                        <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProductReviews;