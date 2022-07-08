import './App.css'
import Header from "./component/layout/Header/Header.js"
import {BrowserRouter as Router,Route,Routes,Switch} from "react-router-dom"
import WebFont from "webfontloader"
import React from "react";
import Footer from "./component/layout/Footer/Footer"
import Home from './component/Home/Home.js'
import Loader from "./component/layout/loader/Loader.js"
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Products/Products"
import Search  from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
// import Routes from "react-router-dom"
import store from './store'
import {loadUser} from "./actions/userAction"
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import {useState,useEffect} from "react"
import axios from "axios"
import Payment from "./component/Cart/Payment.js"
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import Dashboard from "./component/admin/Dashboard.js"
import ProductList from "./component/admin/ProductList.js"
import NewProduct from "./component/admin/NewProduct.js"
import UpdateProduct from "./component/admin/UpdateProduct.js"
import OrderList from "./component/admin/OrderList.js"
import ProcessOrder from "./component/admin/ProcessOrder.js"
import UsersList from "./component/admin/UsersList.js"
import UpdateUser from "./component/admin/UpdateUser.js"
import ProductReviews from "./component/admin/ProductReviews.js"

function App() {
    const {isAuthenticated,user} = useSelector((state)=> state.user);

    const [stripeApiKey, setStripeApiKey] = useState("")

    async function getStripeApiKey(){
        console.log("before data from stripeapi")
        const {data} = await axios.get("/api/v1/stripeapikey");
        console.log("data from stripeapi", data)
        setStripeApiKey(data.stripeApiKey)
    }

    useEffect(()=>{
        WebFont.load({
            google:{
                families: ["Roboto","Droid Sans","Chilanka"]
            }
        });

        store.dispatch(loadUser());

        getStripeApiKey()
    },[])

    console.log(isAuthenticated, UserOptions)

    return (<Router>
                <Header/>
                {isAuthenticated && <UserOptions user={user}/>}
                <Route exact path="/" component={Home}/>  
                <Route exact path="/product/:id" component={ProductDetails}/>  
                <Route exact path='/products' component={Products}/>
                <Route path='/products/:keyword' component={Products}/>
                <Route exact path='/search' component={Search}/>

                <ProtectedRoute exact path={"/account"} component={Profile}/>

                {/* <Route extract path='/search' component={Search}/> */}
                <ProtectedRoute exact path={"/me/update"} component={UpdateProfile}/>
                <ProtectedRoute exact path={"/password/update"} component={UpdatePassword}/>
                <Route exact path={"/password/forgot"} component={ForgotPassword}/>
                <Route exact path={"/password/reset/:token"} component={ResetPassword}/>
                <Route exact path={"/cart"} component={Cart}/>
                <Route exact path={"/login"} component={LoginSignUp}/>
                <ProtectedRoute exact path="/shipping" component={Shipping}/>
                
                
                {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute exact path="/process/payment" component={Payment}/>
                </Elements>
                )}
                <ProtectedRoute exact path="/success" component={OrderSuccess}/>
                <ProtectedRoute exact path="/orders" component={MyOrders}/>
                
                <Switch>
                    <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
                    <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>
                </Switch>
                <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard}/>
                <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList}/>
                <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct}/>
                <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct}/>
                <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList}/>
                <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder}/>
                <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList}/>
                <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser}/>
                <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews}/>
                <Footer/>
            </Router>
            );
}

export default App;