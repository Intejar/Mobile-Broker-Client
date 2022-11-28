import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import Allusers from "../../Pages/Dashboard/AllUsers/Allusers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProduct from "../../Pages/Dashboard/MyProduct/MyProduct";
import MyWishList from "../../Pages/Dashboard/MyWishList/MyWishList";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import WishListPay from "../../Pages/Dashboard/Payment/WishListPay/WishListPay";
import UserProfile from "../../Pages/Dashboard/UserProfile/UserProfile";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Android from "../../Pages/ProductCategory/Android/Android";
import Apple from "../../Pages/ProductCategory/Apple/Apple";
import Google from "../../Pages/ProductCategory/Google/Google";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element : <Main></Main>,
        children:[
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/category/apple',
                element:<PrivateRoute><Apple></Apple></PrivateRoute>
            },
            {
                path:'/category/android',
                element:<PrivateRoute><Android></Android></PrivateRoute>
            },
            {
                path:'/category/google',
                element:<PrivateRoute><Google></Google></PrivateRoute>
            }
        ]
    },
    {
        path : '/dashboard',
        element : <DashboardLayout></DashboardLayout>,
        children: [
            {
                path : '/dashboard',
                element:<UserProfile></UserProfile>
            },
            {
                path : '/dashboard/MyProduct',
                element:<MyProduct></MyProduct>
            },
            {
                path: '/dashboard/AddProduct',
                element : <AddProduct></AddProduct>
            },
            {
                path : '/dashboard/MyOrders',
                element : <MyOrders></MyOrders>
            },
            {
                path : '/dashboard/MyWishList',
                element : <MyWishList></MyWishList>
            },
            {
                path : '/dashboard/AllUsers',
                element : <Allusers></Allusers>
            },
            {
                path : '/dashboard/AllSellers',
                element : <AllSellers></AllSellers>
            },
            {
                path : '/dashboard/AllBuyers',
                element : <AllBuyers></AllBuyers>
            },
            {
                path : '/dashboard/payment/:id',
                element : <Payment></Payment>,
                loader : ({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)
            },
            {
                path: '/dashboard/wishlistPay/:id',
                element: <WishListPay></WishListPay>,
                loader : ({params}) => fetch(`http://localhost:5000/wishlist/${params.id}`)
            }

        ]
    }
])

export default router;