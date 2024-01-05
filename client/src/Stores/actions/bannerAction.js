import axios from "axios";
import { CLEAR_ERRORS, CREATE_BANNER_FAIL, CREATE_BANNER_REQUEST, CREATE_BANNER_SUCCESS, GET_BANNER_FAIL, GET_BANNER_REQUEST, GET_BANNER_SUCCESS } from "../constants/bannerConstant"




export const createBanner = (banner) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_BANNER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/admin/banner/new", banner, config)
        dispatch({ type: CREATE_BANNER_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: CREATE_BANNER_FAIL,
            payload: err.response.data.message,
        })
    }
}

export const getAllBanner = () => async (dispatch) => {
    try {
        dispatch({ type: GET_BANNER_REQUEST });
        const { data } = await axios.get("/api/v1/admin/getBanner");

        dispatch({
            type: GET_BANNER_SUCCESS,
            payload: data.banner,
        })
    } catch (err) {
        dispatch({
            type: GET_BANNER_FAIL,
            payload: err.response.data.message,
        })
    }
}


export const ClearsErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
