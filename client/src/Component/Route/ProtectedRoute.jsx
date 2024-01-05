import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...routeProps }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (!loading && isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    if (!loading && isAdmin === true && user?.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return (
        <Fragment>
            {loading === false ? (
                <Component {...routeProps} />
            ) : null}
        </Fragment>
    );
};

export default ProtectedRoute;