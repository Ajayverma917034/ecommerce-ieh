import { QUERY_REQUEST, QUERY_SUCCESS, QUERY_RESET, QUERY_FAIL, CLEAR_ERROR, ALL_QUERY_REQUEST, ALL_QUERY_SUCCESS, ALL_QUERY_FAIL, QUERY_DETAILS_REQUEST, QUERY_DETAILS_SUCCESS, QUERY_DETAILS_FAIL, UPDATE_QUERY_REQUEST, UPDATE_QUERY_SUCCESS, UPDATE_QUERY_FAIL, UPDATE_QUERY_RESET, DELETE_QUERY_REQUEST, DELETE_QUERY_SUCCESS, DELETE_QUERY_FAIL, DELETE_QUERY_RESET, } from "../constants/queryContant";


export const queryReducer = (state = {}, action) => {
    switch (action.type) {
        case QUERY_REQUEST:
            return { loading: true, ...state }

        case QUERY_SUCCESS:
            return { loading: false, success: action.payload }

        case QUERY_FAIL:
            return { ...state, loading: false, error: action.payload }

        case QUERY_RESET:
            return { ...state, success: false, }

        case CLEAR_ERROR:
            return { ...state, error: null, }
        default:
            return state;
    }
}

export const AllQueryReducer = (state = { queries: [] }, action) => {
    switch (action.type) {
        case ALL_QUERY_REQUEST:
            return {
                loading: true,
            };

        case ALL_QUERY_SUCCESS:
            return {
                loading: false,
                queries: action.payload,
            };

        case ALL_QUERY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


export const queryDetailReducer = (state = { query: {} }, action) => {
    switch (action.type) {
        case QUERY_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case QUERY_DETAILS_SUCCESS:
            return {
                loading: false,
                query: action.payload,
            };

        case QUERY_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}


// for update the QUERY 
export const queryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_QUERY_REQUEST:
        case DELETE_QUERY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_QUERY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case DELETE_QUERY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message,
            }
        case DELETE_QUERY_FAIL:
        case UPDATE_QUERY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_QUERY_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case DELETE_QUERY_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
