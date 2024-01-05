import React, { useEffect } from 'react'
import Navbar from './Component/Navbar/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Component/Home/Home.jsx"
import { Box } from '@mui/material';
import Footer from './Component/Footer/Footer.jsx';
import Notification from './Component/Alert/Notification.jsx';
import DetailedView from './Component/ProductDetails/DetailedView.jsx';
import MainProductsPage from './Component/AllProducts/MainProductsPage.jsx';
import Login from './Component/User/Login.jsx';
import store from "./Stores/store.js"
import { loadUser } from './Stores/actions/userAction.js';
import Profile from './Component/User/Profile.jsx';
import { Service } from './Component/Service/Service.jsx';
import { useSelector } from 'react-redux';
import ProtectedRoute from './Component/Route/ProtectedRoute.jsx';
import UpdateProfile from './Component/User/UpdateProfile.jsx';
import UpdatePassword from './Component/User/UpdatePassword.jsx';
import Cart from './Component/Cart/Cart.jsx';
import Shipping from './Component/Place Order/Shipping/Shipping.jsx';
import ConfirmOrder from './Component/Place Order/ConfirmOrder/ConfirmOrder.jsx';
import Payment from './Component/Place Order/payment/Payment.jsx';
import Success from './Component/Place Order/View Order/Success.jsx';
import MyOrders from './Component/Place Order/View Order/MyOrders.jsx';
import OrderDetails from './Component/Place Order/View Order/OrderDetails.jsx';
import Dashboard from './Component/Admin/Dashboard.jsx';
import ProductList from './Component/Admin/ProductList.jsx';
import NewProduct from './Component/Admin/NewProduct.jsx';
import UpdateProduct from './Component/Admin/UpdateProduct.jsx';
import OrderList from './Component/Admin/OrderList.jsx';
import ProcessOrder from './Component/Admin/ProcessOrder.jsx';
import UserList from './Component/Admin/UserList.jsx';
import UpdateUser from './Component/Admin/UpdateUser.jsx';
import ProductReviews from './Component/Admin/ProductReviews.jsx';
import AllQuery from './Component/Admin/AllQuery.jsx';
import Banner from './Component/Admin/Banner.jsx';
import EditQuery from './Component/Admin/EditQuery.jsx';
import Contact from './Component/ContactUs/Contact.jsx';
import Services from './Component/Services/Services.jsx';
import OrderShipping from './Component/Order-Button/ShippingOrder.jsx';
import OrderButtonConfirm from './Component/Order-Button/OrderButtonConfirm.jsx';
import OrderPayment from './Component/Order-Button/OrderPayment.jsx';

const App = () => {
    const { user, isAuthenticated } = useSelector(state => state.user);

    useEffect(() => {
        store.dispatch(loadUser())
    }, [])
    return (

        <BrowserRouter>
            <Navbar />
            <Notification />
            <Box style={{ padding: '0 10', backgroundColor: '#fdf3f1' }}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/product/:id' element={<DetailedView />} />
                    <Route path='/products' element={<MainProductsPage />} />
                    <Route path='/products/:keyword' element={<MainProductsPage />} />
                    <Route path='/login' element={<Login />} />
                    {/* <Route path='/shipping' element={<Shipping />} /> */}
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/service' element={<Services />} />
                    <Route path='/contact' element={<Contact />} />


                    <Route exact path='/account' element={<ProtectedRoute component={Profile} />} />
                    <Route exact path='/me/update' element={<ProtectedRoute component={UpdateProfile} />} />
                    <Route exact path='/password/update' element={<ProtectedRoute component={UpdatePassword} />} />
                    <Route exact path='/shipping' element={<ProtectedRoute component={Shipping} />} />
                    <Route exact path='/order-shipping' element={<ProtectedRoute component={OrderShipping} />} />
                    <Route exact path='/order/confirm' element={<ProtectedRoute component={ConfirmOrder} />} />
                    <Route exact path='/order/order-confirm' element={<ProtectedRoute component={OrderButtonConfirm} />} />
                    <Route exact path='/process/payment' element={<ProtectedRoute component={Payment} />} />
                    <Route exact path='//process/order-payment' element={<ProtectedRoute component={OrderPayment} />} />
                    <Route exact path='/success' element={<ProtectedRoute component={Success} />} />
                    <Route exact path='/orders' element={<ProtectedRoute component={MyOrders} />} />
                    <Route exact path='/order/:id' element={<ProtectedRoute component={OrderDetails} />} />

                    <Route exact path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} component={Dashboard} />} />
                    <Route exact path='/admin/products' element={<ProtectedRoute isAdmin={true} component={ProductList} />} />
                    <Route exact path='/admin/product' element={<ProtectedRoute isAdmin={true} component={NewProduct} />} />
                    <Route exact path='/admin/product/:id' element={<ProtectedRoute isAdmin={true} component={UpdateProduct} />} />
                    <Route exact path='/admin/orders' element={<ProtectedRoute isAdmin={true} component={OrderList} />} />
                    <Route exact path='/admin/order/:id' element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />} />
                    <Route exact path='/admin/users' element={<ProtectedRoute isAdmin={true} component={UserList} />} />
                    <Route exact path='/admin/user/:id' element={<ProtectedRoute isAdmin={true} component={UpdateUser} />} />
                    <Route exact path='/admin/reviews' element={<ProtectedRoute isAdmin={true} component={ProductReviews} />} />
                    <Route exact path='/admin/query' element={<ProtectedRoute isAdmin={true} component={AllQuery} />} />
                    <Route exact path='/admin/query/:id' element={<ProtectedRoute isAdmin={true} component={EditQuery} />} />
                    <Route exact path='/admin/banner' element={<ProtectedRoute isAdmin={true} component={Banner} />} />

                </Routes>
            </Box>
            <Footer />
        </BrowserRouter>
    )
}

export default App