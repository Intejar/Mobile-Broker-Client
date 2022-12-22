import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { ClimbingBoxLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { FaTrashAlt, FaWindows } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { TabTitle } from '../../../DynamicTitle/DynamicTitle';




const MyOrders = () => {
    TabTitle('My Orders-Mobile Broker')
    const { user } = useContext(AuthContext)
    const crntUserMail = user.email
    const { data: bookings = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['bookings'],
            queryFn: async () => {
                const res = await fetch(`https://mobile-broker-server.vercel.app/bookings?customerEmail=${crntUserMail}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data
            }
        }
    )
    if (isLoading) {
        return <div className='flex justify-center items-center'><ClimbingBoxLoader color="#36d7b7" /></div>
    }

    // const handleAdmin = id => {
    //     fetch(`https://mobile-broker-server.vercel.app/users/admin/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.modifiedCount > 0) {
    //                 toast.success('user added to admin list')
    //                 refetch()
    //             }
    //         })
    // }

    const bookingDelete = (id, name) => {
        const proceed = window.confirm(`Are you sure you want to delete ${name}?`)
        if (proceed) {
            fetch(`https://mobile-broker-server.vercel.app/bookings/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success(`product ${name} booking has successfully deleted`)
                        refetch()
                    }
                })
        }

    }

    return (
        <div>
            <h1 className='text-2xl text-center dark:text-white my-5'>All Orders</h1>
            <div className="overflow-x-auto mx-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Pay</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) =>
                                <tr key={booking._id}>
                                    <th>{i + 1}</th>
                                    <td>{booking.productName}</td>
                                    <td>{booking.productPrice}</td>
                                    <td>
                                        {
                                            booking?.paymentStatus === 'unpaid' ?
                                                <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-xs'>pay</button></Link>
                                                :
                                                <button className='btn btn-xs'>paid</button>
                                        }
                                    </td>
                                    <td> <button onClick={() => bookingDelete(booking._id, booking.productName)}><FaTrashAlt className='text-red-400 hover:text-xl'></FaTrashAlt></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;