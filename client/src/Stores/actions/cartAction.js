import { ADD_TO_CART, ADD_TO_ORDER, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/addToCartConstant";
import axios from "axios";
// add to cart

export const addItmeTocart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            heading: data.product.heading,
            discount: data.product.discount,
            image: data.product.images[0],
            price: data.product.price,
            stock: data.product.Stock,
            quantity,
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    localStorage.setItem("shippingInfo", JSON.stringify(getState().cart.shippingInfo));
}

// remove from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const addItmeToOrder = (id, quantity = 1) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)
    dispatch({
        type: ADD_TO_ORDER,
        payload: {
            product: data.product._id,
            heading: data.product.heading,
            discount: data.product.discount,
            image: data.product.images[0],
            price: data.product.price,
            stock: data.product.Stock,
            quantity,
        },
    });
    localStorage.setItem("ordersAdd", JSON.stringify(getState().ordersAdd));
}