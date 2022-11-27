import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [userRole, setUserRole] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUserRole(data)
            })
    }, [user?.email])
    const userInfo = userRole[0]
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col  bg-gray-300">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-slate-300 dark:bg-slate-600 text-base-content">
                        {
                            userInfo?.role === 'seller' &&
                            <>
                                <li> <Link to='/dashboard/MyProduct'>My Products</Link></li>
                                <li><Link to='/dashboard/AddProduct'>Add Product</Link></li>
                            </>
                        }
                        {
                            userInfo?.role === 'buyer' &&
                            <>
                                <li><Link to='/dashboard/MyOrders'>My Orders</Link></li>
                                <li><Link to='/dashboard/MyWishList'>My Wish List</Link></li>

                            </>
                        }
                        {userInfo?.role ==='admin' && 
                            <>
                                <li><Link to='/dashboard/AllSellers'>All Sellers</Link></li>
                                <li><Link to='/dashboard/AllBuyers'>All Buyers</Link></li>
                                <li><Link to='/dashboard/AllUsers'>All User</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;