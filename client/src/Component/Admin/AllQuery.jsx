import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { alertOption } from "../../Stores/actions/notificationAction";
import { Delete, Edit } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import MetaData from "../metaData/MetaData";
import { Button } from "@mui/base";
import { ClearsErrors, deleteQuery, getAllQuery } from "../../Stores/actions/queryAction";
import { DELETE_QUERY_RESET } from "../../Stores/constants/queryContant";


const UsersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { error, queries } = useSelector((state) => state.AllQuery);

    const {
        loading: updateLoading,
        error: deleteError,
        isDeleted,
    } = useSelector((state) => state.queryUpdate);

    const deleteQueryHandler = (id) => {
        dispatch(deleteQuery(id));
    };

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: "error", message: error }))
            dispatch(ClearsErrors());
        }

        if (deleteError) {
            dispatch(alertOption({ open: true, severity: "error", message: deleteError }))
            dispatch(ClearsErrors());
        }

        if (isDeleted) {
            dispatch(alertOption({ open: true, severity: "success", message: "Query has been deleted successfully" }))
            navigate("/admin/query");
            dispatch({ type: DELETE_QUERY_RESET });
        }

        dispatch(getAllQuery());
    }, [dispatch, error, navigate, isDeleted, deleteError]);

    const columns = [
        { field: "id", headerName: "Query ID", minWidth: 180, flex: 0.8 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },

        {
            field: "contact",
            headerName: "Contact",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            // cellClassName: (params) => {
            //     const { id } = params.id;
            //     return (id, "role") === "admin"
            //         ? "greenColor"
            //         : "redColor";
            // },
        },
        {
            field: "message",
            headerName: "Message",
            minWidth: 200,
            flex: 1,
        }, {
            field: "condition",
            headerName: "Condition",
            minWidth: 200,
            flex: 1,
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
                        <Link to={`/admin/query/${id}`}>
                            <Edit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteQueryHandler(id)
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

    queries &&
        queries.forEach((item) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                contact: item.contactNo,
                message: item.message,
                condition: item.condition,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL Queries</h1>

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

export default UsersList;