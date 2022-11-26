import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { FaTrashAlt, FaWindows } from "react-icons/fa";
import { ClimbingBoxLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';


const AllBuyers = () => {
    const { user } = useContext(AuthContext)
    const crntUserMail = user.email 
    const { data: users = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['users'],
            queryFn: async () => {
                const res = await fetch('http://localhost:5000/users?role=buyer');
                const data = await res.json();
                return data
            }
        }
    )
    if (isLoading) {
        return <div className='flex justify-center items-center'><ClimbingBoxLoader color="#36d7b7" /></div>
    }

    const handleAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
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
                fetch(`http://localhost:5000/users/${id}`, {
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
            <h1>All Seller</h1>
            <div className="overflow-x-auto mx-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Varify</th>
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

export default AllBuyers;