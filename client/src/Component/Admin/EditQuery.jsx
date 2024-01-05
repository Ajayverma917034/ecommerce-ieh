import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { alertOption } from "../../Stores/actions/notificationAction";
import MetaData from "../metaData/MetaData";
import Sidebar from "./Sidebar";
import Loading from "../Loading/Loading";
import { MailOutline, Person, VerifiedUser } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ClearsErrors, getQueryDetails, updateQuery } from "../../Stores/actions/queryAction";
import { UPDATE_QUERY_RESET } from "../../Stores/constants/queryContant";


const UpdateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { loading, error, query } = useSelector((state) => state.queryDetail);

    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.queryUpdate);


    const [condition, setCondition] = useState("");
    const { id } = useParams()

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: "error", message: error }))
            dispatch(ClearsErrors());
        }

        if (updateError) {
            dispatch(alertOption({ open: true, severity: "error", message: updateError }))
            dispatch(ClearsErrors());
        }

        if (isUpdated) {
            dispatch(alertOption({ open: true, severity: "success", message: "Query Updated Successfully" }))
            navigate("/admin/query");
            dispatch({ type: UPDATE_QUERY_RESET });
        }
        dispatch(getQueryDetails(id));
    }, [dispatch, error, id, isUpdated, updateError]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();


        myForm.set("condition", condition);

        dispatch(updateQuery(id, myForm));
    };

    return (
        <Fragment>
            <MetaData title="Update Query" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loading />
                    ) : (
                        <form
                            className="createProductForm"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update Query</h1>

                            <div>
                                <Person />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={query.name}
                                />
                            </div>
                            <div>
                                <MailOutline />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={query.email}
                                />
                            </div>
                            <div>
                                <MailOutline />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    required
                                    value={query.contactNo}
                                />
                            </div>
                            <div>
                                <MailOutline />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    required
                                    value={query.message}
                                />
                            </div>

                            <div>
                                <VerifiedUser />
                                {
                                    query.condition === 'Finished' ?
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            required
                                            value='Already Processed'
                                        /> :

                                        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                                            <option value="">Choose Conditon</option>
                                            <option value="Finished">Finished</option>
                                        </select>
                                }
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={
                                    updateLoading ? true : false || condition === "" ? true : false
                                }
                            >
                                Update
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;