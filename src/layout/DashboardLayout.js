import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
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
                        <li><Link to='/dashboard'>My Products</Link></li>
                        <li><Link to=''>Add Product</Link></li>
                        <li><Link to=''>Make Admin</Link></li>
                        <li><Link to=''>My Buyers</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;