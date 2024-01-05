import axios from "axios";
import { ALL_QUERY_FAIL, ALL_QUERY_REQUEST, ALL_QUERY_SUCCESS, CLEAR_ERROR, DELETE_QUERY_FAIL, DELETE_QUERY_REQUEST, DELETE_QUERY_SUCCESS, QUERY_DETAILS_FAIL, QUERY_DETAILS_REQUEST, QUERY_DETAILS_SUCCESS, QUERY_FAIL, QUERY_REQUEST, QUERY_SUCCESS, UPDATE_QUERY_FAIL, UPDATE_QUERY_REQUEST, UPDATE_QUERY_SUCCESS, } from "../constants/queryContant";
// import { query } from "express";

export const newQuery = (queryData) => async (dispatch) => {
    try {
        dispatch({ type: QUERY_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`/api/v1/query/new`, queryData, config);


        dispatch({
            type: QUERY_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: QUERY_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const getAllQuery = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_QUERY_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/allQuery`);

        dispatch({
            type: ALL_QUERY_SUCCESS,
            payload: data.query,
        });
    } catch (error) {
        dispatch({
            type: ALL_QUERY_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const getQueryDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: QUERY_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/query/${id}`);

        dispatch({ type: QUERY_DETAILS_SUCCESS, payload: data.query });
    } catch (error) {
        dispatch({ type: QUERY_DETAILS_FAIL, payload: error.response.data.message });
    }
};

// Update query
export const updateQuery = (id, condition) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_QUERY_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/admin/query/${id}`,
            condition,
            config
        );

        dispatch({ type: UPDATE_QUERY_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_QUERY_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteQuery = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_QUERY_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/query/${id}`);

        dispatch({ type: DELETE_QUERY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_QUERY_FAIL,
            payload: error.response.data.message,
        });
    }
};




export const ClearsErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}