import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material"
import { Button } from "@mui/base";
import Sidebar from "./Sidebar"
import { alertOption } from "../../Stores/actions/notificationAction";
import { ClearsErrors, deleteProduct, getAdminProducts } from "../../Stores/actions/productAction";
import Metadata from "../metaData/MetaData"
import { DELETE_PRODUCT_RESET } from "../../Stores/constants/productContants";
const ProductList = () => {
    // const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const { error, products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            dispatch(ClearsErrors())
        }

        if (deleteError) {
            dispatch(alertOption({ open: true, severity: 'error', message: deleteError }))
            dispatch(ClearsErrors());
        }

        if (isDeleted) {
            dispatch(alertOption({ open: true, severity: 'error', message: "Product Deleted Successfully" }))
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProducts());
    }, [dispatch, error, navigate, isDeleted, deleteError]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
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
                        <Link to={`/admin/product/${id}`}>
                            <Edit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteProductHandler(id)
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

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.heading,
            });
        });

    return (
        <Fragment>
            <Metadata title={`ALL PRODUCTS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;

// to={`/admin/product/${params.getValue(params.id, "id")}`}