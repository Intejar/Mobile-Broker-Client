import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { ClimbingBoxLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import EditModal from '../EditModal/EditModal';



const MyProduct = () => {
    const { user } = useContext(AuthContext)
    const [edit, setEdit] = useState(null)
    const crntUserMail = user.email
    const { data: products = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['user', crntUserMail],
            queryFn: async () => {
                const res = await fetch(`http://localhost:5000/products?email=${crntUserMail}`);
                const data = await res.json();
                return data
            }
        }
    )
    if (isLoading) {
        return <div className='flex justify-center items-center'><ClimbingBoxLoader color="#36d7b7" /></div>
    }

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure you want to delete this user?')
        if (proceed) {
            fetch(`http://localhost:5000/products/${id}`, {
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

    return (
        <div>
            <h1>All Products</h1>
            <div className="overflow-x-auto mx-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Resale Price</th>
                            <th>edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) =>
                                <tr key={product._id} setEdit={setEdit}>
                                    <th>{i + 1}</th>
                                    <td>{product.productName}</td>
                                    <td>{product.resalePrice}</td>
                                    <td><label onClick={() => setEdit(product._id)} htmlFor="my-modal-3" className='btn'><FaEdit className='text-blue-400 hover:text-xl'></FaEdit></label></td>
                                    <td><button onClick={() => handleDelete(product._id)}><FaTrashAlt className='text-red-400 hover:text-xl'></FaTrashAlt></button>
                                    </td>
                                </tr>
                            )
                        }
                        {
                            edit &&
                            <EditModal edit={edit}></EditModal>
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyProduct;