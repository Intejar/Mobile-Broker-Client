import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import Allusers from "../../Pages/Dashboard/AllUsers/Allusers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProduct from "../../Pages/Dashboard/MyProduct/MyProduct";
import MyWishList from "../../Pages/Dashboard/MyWishList/MyWishList";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Android from "../../Pages/ProductCategory/Android/Android";
import Apple from "../../Pages/ProductCategory/Apple/Apple";
import Google from "../../Pages/ProductCategory/Google/Google";
import Register from "../../Pages/Register/Register";

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
                element:<Apple></Apple>
            },
            {
                path:'/category/android',
                element:<Android></Android>
            },
            {
                path:'/category/google',
                element:<Google></Google>
            }
        ]
    },
    {
        path : '/dashboard',
        element : <DashboardLayout></DashboardLayout>,
        children: [
            {
                path : '/dashboard',
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
            }
        ]
    }
])

export default router;