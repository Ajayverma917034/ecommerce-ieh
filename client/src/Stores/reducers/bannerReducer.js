import { CLEAR_ERRORS, CREATE_BANNER_FAIL, CREATE_BANNER_REQUEST, CREATE_BANNER_RESET, CREATE_BANNER_SUCCESS, DELETE_BANNER_FAIL, DELETE_BANNER_REQUEST, DELETE_BANNER_RESET, DELETE_BANNER_SUCCESS, GET_BANNER_FAIL, GET_BANNER_REQUEST, GET_BANNER_SUCCESS } from "../constants/bannerConstant";

export const newBannerReducer = (state = { banner: {} }, action) => {
    switch (action.type) {
        case CREATE_BANNER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CREATE_BANNER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                banner: action.payload.product,
            };

        case CREATE_BANNER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CREATE_BANNER_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}

export const allBannerReducer = (state = { banner: [] }, action) => {
    switch (action.type) {
        case GET_BANNER_REQUEST:
            return {
                loading: true,
            }
        case GET_BANNER_SUCCESS:
            return {
                loading: false,
                banner: action.payload,
            }
        case GET_BANNER_FAIL:
            return {

                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

export const deleteBanner = (state = {}, action) => {
    switch (action.payload) {
        case DELETE_BANNER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case DELETE_BANNER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case DELETE_BANNER_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}