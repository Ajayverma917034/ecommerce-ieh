import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from './reducers/productReducer';
import { AlertReducer } from './reducers/notificationReducer';
import { allUsersReducer, userReducer } from './reducers/userReducer';
import { profileReducer, userDetailsReducer } from './reducers/userReducer';
import { cartReducer, ordersAddReducer } from './reducers/addToCartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';
import { AllQueryReducer, queryDetailReducer, queryReducer, queryUpdateReducer } from './reducers/queryReducer';
import { allBannerReducer, deleteBanner, newBannerReducer } from './reducers/bannerReducer';

const reducer = combineReducers({
    products: productsReducer,
    alert: AlertReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    query: queryReducer,
    AllQuery: AllQueryReducer,
    queryDetail: queryDetailReducer,
    queryUpdate: queryUpdateReducer,
    ordersAdd: ordersAddReducer,
    newBanner: newBannerReducer,
    allBanner: allBannerReducer,
    deletebann: deleteBanner,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    },

    ordersAdd: localStorage.getItem("ordersAdd") ? JSON.parse(localStorage.getItem("ordersAdd")) : {},

}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
