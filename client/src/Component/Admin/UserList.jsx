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
import { DELETE_USER_RESET } from "../../Stores/constants/userConstant";
import { ClearsErrors, deleteUser, getAllUsers } from "../../Stores/actions/userAction";

const UsersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { error, users } = useSelector((state) => state.allUsers);

    const {
        error: deleteError,
        isDeleted,
        message,
    } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
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
            dispatch(alertOption({ open: true, severity: "success", message: message }))
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, error, deleteError, isDeleted, message, navigate]);

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                const { id } = params.id;
                return (id, "role") === "admin"
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
                const { id } = params.row;
                return (
                    <Fragment>
                        <Link to={`/admin/user/${id}`}>
                            <Edit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandler(id)
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

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

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