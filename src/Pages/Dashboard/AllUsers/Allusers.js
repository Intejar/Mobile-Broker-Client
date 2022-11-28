import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import { FaTrashAlt, FaWindows } from "react-icons/fa";
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { TabTitle } from '../../../DynamicTitle/DynamicTitle';



const Allusers = () => {
    TabTitle('All User-Mobile Broker')
    const { user } = useContext(AuthContext)
    const crntUserMail = user.email 
    const { data: users = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['users'],
            queryFn: async () => {
                const res = await fetch('https://mobile-broker-server.vercel.app/users');
                const data = await res.json();
                return data
            }
        }
    )
    if (isLoading) {
        return <div className='flex justify-center items-center'><ClimbingBoxLoader color="#36d7b7" /></div>
    }

    const handleAdmin = id => {
        fetch(`https://mobile-broker-server.vercel.app/users/admin/${id}`, {
            method: 'PATCH',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('user added to admin list')
                    refetch()
                }
            })
    }

    const userDelete = (id, email) => {
        if (email === crntUserMail) {
            toast.error('you can not delete yourself')
        }
        else {
            const proceed = window.confirm('Are you sure you want to delete this user?')
            if (proceed) {
                fetch(`https://mobile-broker-server.vercel.app/users/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            toast.success('user has successfully deleted')
                            refetch()
                        }
                    })
            }
        }
    }

    return (
        <div>
            <h1 className='text-2xl text-center dark:text-white my-5'>All User</h1>
            <div className="overflow-x-auto mx-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) =>
                                <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user?.role !== 'admin' && <button onClick={() => handleAdmin(user._id)} className='btn btn-xs btn-primary'>make admin</button>}</td>
                                    <td> <button onClick={() => userDelete(user._id, user.email)}><FaTrashAlt className='text-red-400 hover:text-xl'></FaTrashAlt></button>
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

export default Allusers;